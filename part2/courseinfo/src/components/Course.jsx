const Course = ({ course }) => {

    const Header = ({ name }) => (
        <div>
            <h3>{name}</h3>
        </div>
    )

    const Total = ({ array }) => {
        const sum = array.reduce((a, b) => a + b.exercises, 0)
        return (
            <div><strong>total of {sum} exercises</strong></div>
        )
    }

    const Part = ({ part }) => (
        <div>{part.name} {part.exercises}</div>
    )


    const Content = ({ partList }) => {
        const items = []
        partList.parts.forEach((item, i) => {
            items.push(<Part key={i} part={partList.parts[i]} /> )
        })
        return (
            <div>
                {items}
            </div>
        )

    }

    return (
        <div>
            <h2>Web development curriculum</h2>
            <section>
                <Header name={course[0].name} />
                <Content partList={course[0]} />
                <br/>
                <Total array={course[0].parts} />
            </section>
            <section>
                <Header name={course[1].name} />
                <Content partList={course[1]} />
                <br/>
                <Total array={course[1].parts} />
            </section>
        </div>
    )
}

export default Course