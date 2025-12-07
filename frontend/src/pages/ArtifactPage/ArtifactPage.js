import { useState, useEffect } from "react"
import Styles from "./ArtifactPage.module.css"
import {Timeline} from "../../shared/ui/Timeline/Timeline"
import {ArtifactCard} from "../../shared/ui/ArtifactCard/ArtifactCard"
import {useSearchParams} from "react-router-dom"
import Breadcrumbs from "../../shared/ui/Breadcrumbs/Breadcrumbs"
import { routes } from "../../shared/const"
import { ArtifactsAPI, HallsAPI, ArtifactCategoriesAPI } from "../../shared/const/api"

export function ArtifactPage() {
    const [params] = useSearchParams()
    const hallId = params.get("hallId")
    const categoryId = params.get("categoryId")
    
    const [artifacts, setArtifacts] = useState([])
    const [hall, setHall] = useState(null)
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let isMounted = true

        const loadData = async () => {
            setLoading(true)
            setError(null)

            try {
                const categoriesData = await ArtifactCategoriesAPI.list()
                const categoriesList = categoriesData.results || categoriesData || []

                const artifactParams = {}
                if (hallId) artifactParams.hall = hallId
                if (categoryId) artifactParams.category = categoryId
                
                const artifactsData = await ArtifactsAPI.list(artifactParams)
                const artifactsList = artifactsData.results || artifactsData || []

                let hallData = null
                if (hallId) {
                    try {
                        hallData = await HallsAPI.get(hallId)
                    } catch (err) {
                        console.warn("Не удалось загрузить информацию о зале:", err)
                    }
                }

                if (!isMounted) return

                setArtifacts(artifactsList)
                setHall(hallData)
                setCategories(categoriesList)
            } catch (err) {
                if (!isMounted) return
                console.error("Ошибка при загрузке артефактов:", err)
                setError("Не удалось загрузить артефакты. Попробуйте обновить страницу.")
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        loadData()

        return () => {
            isMounted = false
        }
    }, [hallId, categoryId])

    const breadcrumbsLinks = [
        ["Главная", routes.home],
        ["Залы", routes.halls],
    ]
    

    if (hall) {
        breadcrumbsLinks.push([hall.name, `/artifacts?hallId=${hall.id}`])
    } else if (!hallId && !loading) {
        breadcrumbsLinks.push(["Артефакты", "/artifacts"])
    }

    const transformedArtifacts = artifacts.map(artifact => {
        const firstImage = artifact.images && artifact.images.length > 0 
            ? artifact.images[0] 
            : null
        const imageUrl = firstImage?.image_url || "/logo192.png"

        return {
            id: artifact.id,
            title: artifact.name || "Без названия",
            year: artifact.creation_year?.toString() || "",
            image: imageUrl,
            artifact: artifact 
        }
    })

    const sortedArtifacts = [...transformedArtifacts].sort((a, b) => {
        const yearA = parseInt(a.year) || 0
        const yearB = parseInt(b.year) || 0
        return yearA - yearB
    })


    const years = [...new Set(sortedArtifacts
        .map(a => parseInt(a.year))
        .filter(y => !isNaN(y))
    )].sort((a, b) => a - b)

    const timelineYears = years.map(year => ({
        id: year,
        label: year.toString(),
        year: year
    }))

    if (loading) {
        return (
            <>
                <Breadcrumbs links={breadcrumbsLinks}/>
                <div className={Styles.ArtifactPage}>
                    <div style={{ textAlign: "center", padding: "40px" }}>
                        <p>Загрузка артефактов...</p>
                    </div>
                </div>
            </>
        )
    }

    if (error) {
        return (
            <>
                <Breadcrumbs links={breadcrumbsLinks}/>
                <div className={Styles.ArtifactPage}>
                    <div style={{ textAlign: "center", padding: "40px" }}>
                        <p>{error}</p>
                    </div>
                </div>
            </>
        )
    }

    if (transformedArtifacts.length === 0) {
        return (
            <>
                <Breadcrumbs links={breadcrumbsLinks}/>
                <div className={Styles.ArtifactPage}>
                    <div style={{ textAlign: "center", padding: "40px" }}>
                        <p>Артефакты не найдены</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Breadcrumbs links={breadcrumbsLinks}/>
            <div className={Styles.ArtifactPage}>
                <div className={Styles.PageHeader}>
                    <h1 className={Styles.PageTitle}>
                        {hall ? `Экспонаты зала ${hall.name}:` : "Экспонаты:"}
                    </h1>
                </div>
                <div className={Styles.PageContent}>
                    {timelineYears.length > 0 && (
                        <div className={Styles.TimelineContainer}>
                            <Timeline 
                                centuries={timelineYears} 
                                activeCentury={null}
                                onCenturyClick={(yearId) => {
                                    // Прокрутка к артефакту с этим годом
                                    const element = document.querySelector(`[data-year="${yearId}"]`)
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                    }
                                }}
                            />
                        </div>
                    )}
                    <div className={Styles.ArtifactGrid}>
                        {sortedArtifacts.map(artifact => (
                            <div key={artifact.id} data-year={parseInt(artifact.year) || null}>
                                <ArtifactCard artifact={artifact} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}