import Styles from "./Timeline.module.css"

export function Timeline({ artifactsByCentury }) {
    // Получаем века и сортируем их
    const centuries = Object.keys(artifactsByCentury)
        .map(Number)
        .sort((a, b) => a - b)

    return (
        <div className={Styles.Timeline}>
            <div className={Styles.TimelineContent}>
                <div className={Styles.TimelineLine} />
                {centuries.map((century, index) => (
                    <div key={century} className={Styles.TimelineItem}>
                        <div className={Styles.TimelineDot} />
                        <div className={Styles.TimelineYear}>{century / 100 + 1} век</div>
                        <div className={Styles.ArtifactCount}>
                            {artifactsByCentury[century].length} экспонатов
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
} 