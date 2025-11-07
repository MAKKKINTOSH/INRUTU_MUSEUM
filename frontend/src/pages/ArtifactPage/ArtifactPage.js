import Styles from "./ArtifactPage.module.css"
import {artifacts} from "../const УСТАРЕЛО/artifacts"
import {Timeline} from "../../shared/ui/Timeline/Timeline"
import {ArtifactCard} from "../../shared/ui/ArtifactCard/ArtifactCard"
import {useSearchParams} from "react-router-dom"
import Breadcrumbs from "../../shared/ui/Breadcrumbs/Breadcrumbs"
import { routes } from "../../shared/const"
import {museumSections} from "../const УСТАРЕЛО/sections"

export function ArtifactPage() {
    const [params] = useSearchParams()
    const hall = params.get("hall")
    const room = params.get("room")

    // Формируем хлебные крошки
    const breadcrumbsLinks = [
        ["Главная", routes.home],
        ["Залы", routes.halls],
    ]
    
    if (hall && museumSections[hall]) {
        const hallTitle = museumSections[hall].title
        const roomTitle = museumSections[hall].sections.find(section => section.id === room)?.title
        
        breadcrumbsLinks.push([hallTitle, `${routes.halls}?hallType=${hall}`])
        if (roomTitle) {
            breadcrumbsLinks.push([roomTitle, `/artifacts?hall=${hall}&room=${room}`])
        }
    }

    const filteredArtifacts = artifacts.filter(artifact => 
        (!hall || artifact.hall === hall) && 
        (!room || artifact.room === room)
    )

    // Группируем артефакты по векам
    const artifactsByCentury = filteredArtifacts.reduce((acc, artifact) => {
        const year = parseInt(artifact.year)
        const century = Math.floor(year / 100) * 100
        if (!acc[century]) {
            acc[century] = []
        }
        acc[century].push(artifact)
        return acc
    }, {})

    // Сортируем века по возрастанию
    const sortedCenturies = Object.keys(artifactsByCentury).sort((a, b) => parseInt(a) - parseInt(b))

    return (
        <>
            <Breadcrumbs links={breadcrumbsLinks}/>
            <div className={Styles.ArtifactPage}>
                <Timeline artifactsByCentury={artifactsByCentury} />
                <div className={Styles.ArtifactGrid}>
                    {sortedCenturies.map(century => (
                        <div key={century} className={Styles.CenturySection}>
                            <h2 className={Styles.CenturyTitle}>{parseInt(century) / 100 + 1} век</h2>
                            <div className={Styles.ArtifactCards}>
                                {artifactsByCentury[century].map(artifact => (
                                    <ArtifactCard key={artifact.id} artifact={artifact} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}