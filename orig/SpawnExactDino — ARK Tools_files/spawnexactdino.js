let _DATA = null;
    const _FIELDS = [
    	'[name=creatures]',
    	'#sthw', '#stht',
    		'#stsw', '#stst',
    		'#stow', '#stot',
    		'#stfw', '#stft',
    		'#stww', '#stwt',
    		'#stmdw', '#stmdt',
    		'#stmsw', '#stmst',
    	];

function updCommand() {
	const values = [];
	_FIELDS.forEach(id => {
		values.push(document.querySelector(id).value);
	});
	console.log(values);
	
	const $gen = document.querySelector('#gen');
	$gen.innerText = 'cheat SpawnExactDino "Blueprint\'';
	$gen.innerText += values[0]; // bp
	$gen.innerText += '\'" "" 0';
	
	const wild = [values[1], values[3], values[5], values[7], values[9], values[11], values[13], 0];
	const tame = [values[2], values[4], values[6], values[8], values[10], values[12], values[14], 0];
	
	let baseLevel = 1;
	let tameLevel = 0;
	wild.forEach(x => baseLevel += parseInt(x));
	tame.forEach(x => tameLevel += parseInt(x));
	$gen.innerText += ' ' + baseLevel + ' ' + tameLevel;
	$gen.innerText += ' "' + wild.join(',') + '" "' + tame.join(',') + '"';
	$gen.innerText += ' "Spawned" 0 0 "" "" "" 0 0 "" 0 0 0 20 20';
}


function addDino(version, dino) {
	const $select = document.querySelector('[name=creatures]');
	
	let dinoName = dino['name'];
	if (dino.variants) {
		dinoName += ' (';
		dinoName += dino.variants.join(', ');
		dinoName += ')';
	}
	
	const $option = document.createElement('option');
	$option.setAttribute('value', dino['blueprintPath']);
	$option.innerText = dinoName;
	$select.appendChild($option);
}

function modChanged() {
    let select = document.querySelector('[name=mod]');
    let file = select.value;
    if (file === 'ignore') {
        return;
    }

    fetch(OBELISK + '/asb/' + file)
        .then(data => data.json())
        .then(asb => {
            let version = asb.version;
            if (asb.species) {
                asb.species.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });

		asb.species.forEach(dino => {
	                addDino(version, dino);
		});
		_DATA = asb.species;
            } else {
                alert('Mod has no species.');
            }
        });
}

function consumeManifest(manifest) {
    let select = document.querySelector('[name=mod]');

    for (let key in manifest.files) {
        let info = manifest.files[key];
        let option = document.createElement('option');
        option.setAttribute('value', key);
        if (info.mod) {
            option.innerText = `${info.mod.id}: ${info.mod.title}`;
        } else {
            option.innerText = 'Core';
        }
        select.appendChild(option);
    }

    select.addEventListener('change', modChanged);
    
    	_FIELDS.forEach(id => {
		document.querySelector(id).addEventListener('change', updCommand);
    	});
}

const OBELISK = 'https://raw.githubusercontent.com/arkutils/Obelisk/master/data';
//const OBELISK = 'https://shares.alexsstuff.me/u/alex/ARK/Obelisk-prerelease/data';

(function () {
    fetch(OBELISK + '/asb/_manifest.json')
        .then(data => {
            return data.json();
        })
        .then(manifest => {
            consumeManifest(manifest);
        });
})()
