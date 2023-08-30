'''
Script to name server list JSON out of a list of names and links.

Name and links should be in a file called namelist.txt, with each line
being a tab-separated pair of name and link.
'''

from pathlib import Path

MAPS: tuple[str, ...] = (
    "TheIsland",
    "Aberration",
    "CrystalIsles",
    "Extinction",
    "Fjordur",
    "GenOne",
    "GenTwo",
    "LostIsland",
    "Ragnarok",
    "ScorchedEarth",
    "TheCenter",
    "Valguero",
)

PVPVE: tuple[str, ...] = (
    "PVP",
    "PVE",
)

REGIONS: tuple[str, ...] = (
    'NA',
    'EU',
    'OC',
    'SA',
    'Asia',
)

MODES: tuple[str, ...] = (
    "Conquest",
    "Hardcore",
    "SmallTribes",
    "LEGACY",
    "*Beginner*",
    "FreeBuildNoMissions",
    "ARKpocalypse",
)

FLAGS: tuple[str, ...] = (
    "PrimPlus",
    "OfflineRaidProtection",
    "CrossArk",
    "Isolated",
    "LDL",
    "NoTek",
    "b",
)

IGNORES: tuple[str, ...] = (
    'The',
    'OfficialServer',
    'Official',
    ' (on Nitrado)',
    '-',
)

lines = Path('namelist.txt').read_text().splitlines()

# lines are of the form <name>\t<link>

def pull_parts(name: str, options: tuple[str, ...]):
    for option in options:
        if option in name:
            name = name.replace(option, '')
            return name, option
    return name, None

def pull_multi_parts(name: str, options: tuple[str, ...]) -> tuple[str, tuple[str, ...]]:
    found: list[str] = []
    for option in options:
        if option in name:
            name = name.replace(option, '')
            found.append(option)
    return name, tuple(found)


entries = []

for line in lines:
    name, link = line.split('\t')
    original_name = name

    name, map = pull_parts(name, MAPS)
    name, pv = pull_parts(name, PVPVE)
    name, region = pull_parts(name, REGIONS)
    name, mode = pull_parts(name, MODES)
    name, flags = pull_multi_parts(name, FLAGS)
    name, _ = pull_multi_parts(name, IGNORES)

    # Clean up the mode
    if mode == '*Beginner*':
        mode = 'Beginner'

    try:
        server_number = int(name)
        if 'b' in flags:
            server_number = str(server_number) + 'b'
        else:
            server_number = str(server_number)
    except ValueError:
        print(original_name)
        print(f'Found: {map} {pv} {region} {mode} {flags}, remaining = {name}')

    entry: dict[str, str|tuple[str, ...]] = {
        'name': original_name,
        'link': link,
    }

    if map: entry['map'] = map
    if pv: entry['pvpve'] = pv
    if region: entry['region'] = region
    if mode: entry['mode'] = mode
    if flags: entry['flags'] = flags

    entries.append(entry)

data = {
    'date': '2023-08-30',
    'servers': entries,
}

import json
Path('../src/routes/(pages)/tools/officialdownload/Aug2023/servers.json').write_text(json.dumps(data))

# Date: 2023-08-30
