import Styles from "./HallPage.module.css"
import {museumSections} from '../../const/sections'
import {MuseumWidgetList} from "../../../shared/ui";
import {Fragment} from "react";
import {useSearchParams, Link} from "react-router-dom";
import {Breadcrumbs} from "../../../shared/ui/Breadcrumbs/Breadcrumbs";

const breadcrumbsLinks = [
    ["Главная", "/home"],
    ["Залы", "/halls"]
]

function getHallPageHeader(hallType, hallSectionsLinks) {
    return (
        <div className={Styles.HallsHeader}>
            {
                hallSectionsLinks.map(({name, link, type}) => (
                    type === hallType ?
                        <p className="text" key={name}>{name}</p>
                        : <p className="text" key={name}><Link className="link" to={link}>{name}</Link></p>
                ))
            }
            {hallType !== "all" ? <p className="title t-lt pb-8" style={{paddingTop: 0}}>Выберете зал</p> : null}
        </div>
    )
}

export function HallPage() {

    const [params] = useSearchParams()
    const paramsHallType = params.get("hallType")
    const hallType = paramsHallType !== null && paramsHallType in museumSections ? paramsHallType : "all";

    let hallSectionsLinks = [
        {
            name: "Все залы",
            link: "/halls",
            type: "all"
        }
    ]
    hallSectionsLinks.push(...Object.entries(museumSections).map(([k, v]) => ({name: v.title, link: v.link, type: k})))

    const sections = hallType in museumSections? {[hallType]: museumSections[hallType]} : museumSections;

    return (
        <>
            <Breadcrumbs links={breadcrumbsLinks}/>
            {getHallPageHeader(hallType, hallSectionsLinks)}
            <section className={Styles.ContentSection}>
                {
                    Object.values(sections).map((section, i) =>
                        <Fragment key={i}>
                            {
                                hallType === "all" ? <p className="title">{section.title}</p> : null
                            }
                            <MuseumWidgetList widgets={section.sections}/>
                        </Fragment>
                    ).reduce((prev, curr) => {
                        return prev === null ? [prev] : [prev, <hr key={(crypto.randomUUID())} className={Styles.SectionsSeparator}/>, curr]
                    })
                }
            </section>
        </>
    )
}