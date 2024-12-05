/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    blue: '#5865a6',
                    purple: '#7943a7'
                },
                secondary: {
                    black: '#1b1b1e',
                    white: '#f7f7f7',
                    darkGray: '#8b8b8b',
                    gray: '#c3c3c3',
                    lightGray: '#ebebeb',
                    red: '#ec1421',
                },
            },
            backgroundImage: {
                techGradient: "linear-gradient(to right, #5865a6, #7943a7)"
            },
            boxShadow: {
                'custom': '4px 5px 4px rgba(121, 67, 167, 0.2)', // x, y, blur, color with opacity
                'modal': '9px 9px 0px #5865A6', // x, y, blur, color with opacity
            },
        },
        fontFamily: {
            'chackra': ['"Chakra Petch"'],
            'verdana': ['Verdana']
        }
    },
    plugins: [],
}