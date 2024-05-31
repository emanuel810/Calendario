export const getEnvVariables = () => {

    // import.meta.env; da error con vite al montar el build

    return {
        VITE_API_URL: "https://mern-mi-agenda-wsvk.vercel.app/api"
    }
}