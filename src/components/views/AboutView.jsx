import { useState } from "react"
import { BarChart3, Wrench } from "lucide-react"
import { TrafficPanel } from "@/components/TrafficPanel"

export function AboutView({
  labels,
  skills,
  language,
  traffic,
}) {
  const [panel, setPanel] = useState("skills")

  return (
    <section className="view-panel about-view">
      <div className="about-layout">
        <div className="about-principles">
          <div className="about-heading">
            <span className="micro-label">{labels.kicker}</span>
            <h1>{labels.title}</h1>
          </div>

          <div className="principle-grid-v5">
            {labels.items.map(([number, title, body]) => (
              <article key={number}>
                <span className="principle-number">{number}</span>
                <h2>{title}</h2>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="skills-panel">
          <div className="about-subtabs">
            <button
              className={panel === "skills" ? "active" : ""}
              onClick={() => setPanel("skills")}
            >
              <Wrench className="h-4 w-4" />
              {labels.skillsTab}
            </button>

            <button
              className={panel === "traffic" ? "active" : ""}
              onClick={() => setPanel("traffic")}
            >
              <BarChart3 className="h-4 w-4" />
              {labels.trafficTab}
            </button>
          </div>

          {panel === "skills" ? (
            <>
              <div className="skills-heading">
                <span className="micro-label">{labels.skillsTitle}</span>
                <p>{labels.skillsBody}</p>
              </div>

              <div className="skills-list">
                {skills.map((skill, index) => (
                  <article className="skill-row" key={skill.id}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{skill.title}</h3>
                      <p>{skill.description?.[language]}</p>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <TrafficPanel data={traffic} labels={labels} />
          )}
        </div>
      </div>
    </section>
  )
}
