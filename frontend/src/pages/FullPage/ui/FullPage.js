import {Footer, Header} from "../../../widgets";

export function FullPage({children, onAdminClick}) {
    return (
        <>
            <Header/>
                <div className="Content">
                    {children}
                </div>
            <Footer onAdminClick={onAdminClick}/>
        </>
    )
}