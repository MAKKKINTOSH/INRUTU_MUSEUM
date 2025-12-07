import { useState, useEffect, Fragment } from "react"
import Styles from "./HallPage.module.css"
import {MuseumWidgetList} from "../../shared/ui";
import {useSearchParams, Link} from "react-router-dom";
import Breadcrumbs from "../../shared/ui/Breadcrumbs/Breadcrumbs";
import { routes } from "../../shared/const";
import { HallsAPI, HallCategoriesAPI } from "../../shared/const/api";

const breadcrumbsLinks = [
    ["Главная", routes.home],
    ["Залы", routes.halls]
]

function getHallPageHeader(selectedCategoryId, categories, halls) {
    const hallSectionsLinks = [
        {
            name: "Все залы",
            link: routes.halls,
            categoryId: null
        },
        ...categories.map(cat => ({
            name: cat.name,
            link: `${routes.halls}?categoryId=${cat.id}`,
            categoryId: cat.id
        }))
    ]

    return (
        <div className={Styles.HallsHeader}>
            <div className={Styles.Navigation}>
                {hallSectionsLinks.map(({name, link, categoryId}) => (
                    categoryId === selectedCategoryId ?
                        <p className="text" key={name}>{name}</p>
                        : <p className="text" key={name}><Link className="link" to={link}>{name}</Link></p>
                ))}
            </div>
            <h1 className={Styles.PageTitle}>Выберите зал:</h1>
        </div>
    )
}

export function HallPage() {
    const [params] = useSearchParams()
    const categoryId = params.get("categoryId")
    const hallId = params.get("hallId")

    const [halls, setHalls] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let isMounted = true

        const loadData = async () => {
            setLoading(true)
            setError(null)

            try {

                const categoriesData = await HallCategoriesAPI.list()
                const categoriesList = categoriesData.results || categoriesData || []

                const hallParams = categoryId ? { category: categoryId } : {}
                const hallsData = await HallsAPI.list(hallParams)
                const hallsList = hallsData.results || hallsData || []

                if (!isMounted) return

                setCategories(categoriesList)
                setHalls(hallsList)
            } catch (err) {
                if (!isMounted) return
                console.error("Ошибка при загрузке залов:", err)
                setError("Не удалось загрузить залы. Попробуйте обновить страницу.")
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
    }, [categoryId])

    const transformHallsToWidgets = (hallsList) => {
        return hallsList.map(hall => {
            const imageUrl = hall.image?.image_url || "/logo192.png"
            return {
                id: hall.id,
                text: hall.name,
                imageUrl: imageUrl,
                link: `/artifacts?hallId=${hall.id}`
            }
        })
    }

    const groupedHalls = halls.reduce((acc, hall) => {
        const catId = hall.category?.id || "uncategorized"
        const catName = hall.category?.name || "Без категории"
        
        if (!acc[catId]) {
            acc[catId] = {
                category: hall.category || { id: catId, name: catName },
                halls: []
            }
        }
        acc[catId].halls.push(hall)
        return acc
    }, {})

    const filteredGroups = categoryId 
        ? (groupedHalls[categoryId] ? { [categoryId]: groupedHalls[categoryId] } : {})
        : groupedHalls

    if (loading) {
        return (
            <>
                <Breadcrumbs links={breadcrumbsLinks}/>
                <div className={Styles.ContentSection}>
                    <div style={{ textAlign: "center", padding: "40px" }}>
                        <p>Загрузка залов...</p>
                    </div>
                </div>
            </>
        )
    }

    if (error) {
        return (
            <>
                <Breadcrumbs links={breadcrumbsLinks}/>
                <div className={Styles.ContentSection}>
                    <div style={{ textAlign: "center", padding: "40px" }}>
                        <p>{error}</p>
                    </div>
                </div>
            </>
        )
    }

    if (halls.length === 0) {
        return (
            <>
                <Breadcrumbs links={breadcrumbsLinks}/>
                {getHallPageHeader(categoryId, categories, halls)}
                <div className={Styles.ContentSection}>
                    <div style={{ textAlign: "center", padding: "40px" }}>
                        <p>Залы не найдены</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Breadcrumbs links={breadcrumbsLinks}/>
            {getHallPageHeader(categoryId, categories, halls)}
            <section className={Styles.ContentSection}>
                {Object.values(filteredGroups)
                    .filter(group => group && group.halls && group.halls.length > 0)
                    .map((group, i) => {
                        const widgets = transformHallsToWidgets(group.halls)
                        return (
                            <Fragment key={group.category.id || i}>
                                <MuseumWidgetList widgets={widgets}/>
                            </Fragment>
                        )
                    })}
            </section>
        </>
    )
}