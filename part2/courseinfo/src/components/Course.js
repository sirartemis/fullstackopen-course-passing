const Header = ({ course }) => <h1>{course}</h1> 

const Part = ({ part }) => {
  return <p>{part.name} {part.exercises}</p>
}

const Content = ({ parts }) => {

  return parts.map(part => <Part key={part.id} part={part} />)
}

const Total = ({ parts }) => {

  const total = parts.reduce((prev, next) => prev + next.exercises, 0)

  return <p><strong>Total of {total} exercises</strong></p>

}

const Course = ({course}) => (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
)

export default Course