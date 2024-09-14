import React from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const TopPanel = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: lightblue;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`

const CountText = styled.div`
  flex: 1;
  font-size: 20px;
  margin-right: 20px;
`

const Button = styled.button`
  background-color: lightcoral;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
`

const Counter = () => {
  const dispatch = useDispatch()
  const count = useSelector((state) => state.counter.count)

  return (
    <TopPanel>
      <CountText>Counter: {count}</CountText>
      <Button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</Button>
      <Button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</Button>
    </TopPanel>
  )
}

const Map = () => {
  const [svgContent, setSvgContent] = React.useState(null)
  const svgContainerRef = React.useRef()

  React.useEffect(() => {
    fetch('/map.svg')
      .then((response) => response.text())
      .then((data) => setSvgContent(data))
  }, [])

  React.useEffect(() => {
    if (!svgContent) return

    const svg = svgContainerRef.current.querySelector('svg')
    const paths = svg.querySelectorAll('ellipse')

    paths.forEach((path) => {
      path.addEventListener('click', () => {
        path.style.fill = 'red'
      })
    })
  }, [svgContent])

  return (
    <div
      ref={svgContainerRef}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  )
}

const DemoPage = () => {
  return (
    <AppContainer>
      <Counter />
      <Map />
    </AppContainer>
  )
}

export default DemoPage
