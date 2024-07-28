import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const miapeerTheme: CustomThemeConfig = {
    name: 'miapeer-theme',
    properties: {
        // =~= Theme Properties =~=
        '--theme-font-family-base': `'Montserrat', 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif, system-ui`,
        '--theme-font-family-heading': `'Montserrat', 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif, system-ui`,
        '--theme-font-color-base': '0 0 0',
        '--theme-font-color-dark': '255 255 255',
        '--theme-rounded-base': '9999px',
        '--theme-rounded-container': '8px',
        '--theme-border-base': '1px',
        // =~= Theme On-X Colors =~=
        '--on-primary': '0 0 0',
        '--on-secondary': '255 255 255',
        '--on-tertiary': '255 255 255',
        '--on-success': '0 0 0',
        '--on-warning': '0 0 0',
        '--on-error': '255 255 255',
        '--on-surface': '255 255 255',
        // =~= Theme Colors  =~=
        // primary | #fcc813
        '--color-primary-50': '255 247 220', // #fff7dc
        '--color-primary-100': '254 244 208', // #fef4d0
        '--color-primary-200': '254 241 196', // #fef1c4
        '--color-primary-300': '254 233 161', // #fee9a1
        '--color-primary-400': '253 217 90', // #fdd95a
        '--color-primary-500': '252 200 19', // #fcc813
        '--color-primary-600': '227 180 17', // #e3b411
        '--color-primary-700': '189 150 14', // #bd960e
        '--color-primary-800': '151 120 11', // #97780b
        '--color-primary-900': '123 98 9', // #7b6209
        // secondary | #212529
        '--color-secondary-50': '222 222 223', // #dededf
        '--color-secondary-100': '211 211 212', // #d3d3d4
        '--color-secondary-200': '200 201 202', // #c8c9ca
        '--color-secondary-300': '166 168 169', // #a6a8a9
        '--color-secondary-400': '100 102 105', // #646669
        '--color-secondary-500': '33 37 41', // #212529
        '--color-secondary-600': '30 33 37', // #1e2125
        '--color-secondary-700': '25 28 31', // #191c1f
        '--color-secondary-800': '20 22 25', // #141619
        '--color-secondary-900': '16 18 20', // #101214
        // tertiary | #434b50
        '--color-tertiary-50': '227 228 229', // #e3e4e5
        '--color-tertiary-100': '217 219 220', // #d9dbdc
        '--color-tertiary-200': '208 210 211', // #d0d2d3
        '--color-tertiary-300': '180 183 185', // #b4b7b9
        '--color-tertiary-400': '123 129 133', // #7b8185
        '--color-tertiary-500': '67 75 80', // #434b50
        '--color-tertiary-600': '60 68 72', // #3c4448
        '--color-tertiary-700': '50 56 60', // #32383c
        '--color-tertiary-800': '40 45 48', // #282d30
        '--color-tertiary-900': '33 37 39', // #212527
        // success | #35b269
        '--color-success-50': '225 243 233', // #e1f3e9
        '--color-success-100': '215 240 225', // #d7f0e1
        '--color-success-200': '205 236 218', // #cdecda
        '--color-success-300': '174 224 195', // #aee0c3
        '--color-success-400': '114 201 150', // #72c996
        '--color-success-500': '53 178 105', // #35b269
        '--color-success-600': '48 160 95', // #30a05f
        '--color-success-700': '40 134 79', // #28864f
        '--color-success-800': '32 107 63', // #206b3f
        '--color-success-900': '26 87 51', // #1a5733
        // warning | #b47216
        '--color-warning-50': '244 234 220', // #f4eadc
        '--color-warning-100': '240 227 208', // #f0e3d0
        '--color-warning-200': '236 220 197', // #ecdcc5
        '--color-warning-300': '225 199 162', // #e1c7a2
        '--color-warning-400': '203 156 92', // #cb9c5c
        '--color-warning-500': '180 114 22', // #b47216
        '--color-warning-600': '162 103 20', // #a26714
        '--color-warning-700': '135 86 17', // #875611
        '--color-warning-800': '108 68 13', // #6c440d
        '--color-warning-900': '88 56 11', // #58380b
        // error | #ac1b1b
        '--color-error-50': '243 221 221', // #f3dddd
        '--color-error-100': '238 209 209', // #eed1d1
        '--color-error-200': '234 198 198', // #eac6c6
        '--color-error-300': '222 164 164', // #dea4a4
        '--color-error-400': '197 95 95', // #c55f5f
        '--color-error-500': '172 27 27', // #ac1b1b
        '--color-error-600': '155 24 24', // #9b1818
        '--color-error-700': '129 20 20', // #811414
        '--color-error-800': '103 16 16', // #671010
        '--color-error-900': '84 13 13', // #540d0d
        // surface | #434b50
        '--color-surface-50': '227 228 229', // #e3e4e5
        '--color-surface-100': '217 219 220', // #d9dbdc
        '--color-surface-200': '208 210 211', // #d0d2d3
        '--color-surface-300': '180 183 185', // #b4b7b9
        '--color-surface-400': '123 129 133', // #7b8185
        '--color-surface-500': '67 75 80', // #434b50
        '--color-surface-600': '60 68 72', // #3c4448
        '--color-surface-700': '50 56 60', // #32383c
        '--color-surface-800': '40 45 48', // #282d30
        '--color-surface-900': '33 37 39' // #212527
    }
};
