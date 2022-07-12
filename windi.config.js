import { transform, defineConfig } from 'windicss/helpers';

export default defineConfig({
    plugins: [transform('daisyui')],

    daisyui: {
        themes: [
            'light',
            'dark',
            'synthwave',
            {
                'dark-cyan': {
                    primary: '#059669',
                    'primary-focus': '#1a7a5c',
                    'primary-content': '#e0f1e0',
                    secondary: '#37cdbe',
                    'secondary-focus': '#2d8f86',
                    'secondary-content': '#e7f3f1',
                    accent: '#b713d8',
                    'accent-focus': '#8d1fa3',
                    'accent-content': '#f3e6f4',
                    neutral: '#3d4451',
                    'neutral-focus': '#2a2e37',
                    'neutral-content': '#dbf0ea',
                    'base-100': '#111827',
                    'base-200': '#1d2e3e',
                    'base-300': '#2f4860',
                    'base-content': '#d1dce6',
                    info: '#2094f3',
                    success: '#009485',
                    warning: '#ff9900',
                    error: '#ff5724'
                }
            }
        ]
    }
});
