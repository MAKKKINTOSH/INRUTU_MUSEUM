import {HomePage} from "../../pages";
import {NotFoundPage} from "../../pages";


export const routes = [
    {
        path: "/",
        element: <HomePage/>
    },
    {
        path: "*",
        element: <NotFoundPage/>
    }
]