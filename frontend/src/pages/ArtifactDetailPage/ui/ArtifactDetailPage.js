import Styles from "./ArtifactDetailPage.module.css"
import {artifacts} from "../../const/artifacts"
import {useParams, useSearchParams} from "react-router-dom"
import {Breadcrumbs} from "../../../shared/ui/Breadcrumbs/Breadcrumbs"
import {museumSections} from "../../const/sections"
import vovaImage from "../../../shared/static/images/vova.png"
import lenaImage from "../../../shared/static/images/lena.png"
import jannaImage from "../../../shared/static/images/janna.png"

export function ArtifactDetailPage() {
    const {id} = useParams()
    const [params] = useSearchParams()
    const hall = params.get("hall")
    const room = params.get("room")

    const artifact = artifacts.find(a => a.id === parseInt(id))

    // Формируем хлебные крошки
    const breadcrumbsLinks = [
        ["Главная", "/home"],
        ["Залы", "/halls"],
    ]
    
    if (hall && museumSections[hall]) {
        const hallTitle = museumSections[hall].title
        const roomTitle = museumSections[hall].sections.find(section => section.id === room)?.title
        
        breadcrumbsLinks.push([hallTitle, `/halls?hallType=${hall}`])
        if (roomTitle) {
            breadcrumbsLinks.push([roomTitle, `/artifacts?hall=${hall}&room=${room}`])
        }
    }
    
    if (artifact) {
        breadcrumbsLinks.push([artifact.title, `/artifact/${artifact.id}?hall=${hall}&room=${room}`])
    }

    if (!artifact) {
        return <div>Артефакт не найден</div>
    }

    // Массив изображений для галереи
    const galleryImages = [artifact.image, vovaImage, lenaImage, jannaImage]

    return (
        <>
            <Breadcrumbs links={breadcrumbsLinks}/>
            <div className={Styles.ArtifactDetailPage}>
                <div className={Styles.Content}>
                    <div className={Styles.ImageGallery}>
                        <div className={Styles.MainImage}>
                            <img src={artifact.image} alt={artifact.title} className={Styles.Image}/>
                        </div>
                        <div className={Styles.Thumbnails}>
                            {galleryImages.map((image, index) => (
                                <div 
                                    key={index} 
                                    className={Styles.Thumbnail}
                                    onClick={() => {
                                        const mainImage = document.querySelector(`.${Styles.MainImage} img`)
                                        if (mainImage) {
                                            mainImage.src = image
                                        }
                                    }}
                                >
                                    <img src={image} alt={`${artifact.title} - фото ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={Styles.Info}>
                        <h1 className={Styles.Title}>{artifact.title}</h1>
                        <p className={Styles.Year}>Год создания: {artifact.year}</p>
                        <div className={Styles.Description}>
                            <h2>Описание</h2>
                            <p>{artifact.description}</p>
                        </div>
                        <div className={Styles.Location}>
                            <h2>Расположение</h2>
                            <p>Зал: {museumSections[artifact.hall]?.title}</p>
                            <p>Комната: {museumSections[artifact.hall]?.sections.find(s => s.id === artifact.room)?.title}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} 