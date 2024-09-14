import React, { Component, useEffect } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { wsConnect, wsDisconnect, wsToggleSpot } from '../actions/checkIn'
import { logout } from '../auth'

const AppContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const TopBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 32px;
  padding: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
  background: #fcfcfcb2;
  backdrop-filter: blur(10px);
`

const TopBarAppHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`

const TopBarAppHeaderLogo = styled.div`
  font-size: 30px;
  color: #000000;
`

const TopBarAppHeaderText = styled.div`
  font-size: 24px;
  color: #666666;
  font-weight: 300;
  font-variation-settings: 'opsz' 40;
  //font-variation-settings: 'wdth' 50;
  //font-variation-settings: 'wdth' 75;
`

const TopBarIconButton = styled.button`
  font-size: 32px;
  color: #4a4a4a;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  &:focus {
    outline: 2px solid #4a4a4a;
    outline-offset: 2px;
  }
`

const TopBarFiller = styled.div`
  flex: auto;
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

const BottomBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 32px;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: #fcfcfcb2;
  backdrop-filter: blur(10px);
`

const BottomBarDropdown = styled.select`
  background-color: #ffffff;
  border: none;
  border-radius: 5px;
  color: #000000;
  font-size: 16px;
  padding: 8px 8px;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 300;
  font-variation-settings: 'opsz' 40;
`

const BottomBarAddressDropdown = styled(BottomBarDropdown)`
  flex: auto;
  max-width: 320px;
`

const BottomBarFloorDropdown = styled(BottomBarDropdown)`
  flex: 0 0 96px;
`

const MapContainer = styled.div`
  height: 100%;
  text-align: center;
  margin-top: 56px;
`

const ProgressIndicatorContainer = styled.div`
  position: fixed;
  bottom: 96px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ProgressIndicatorBody = styled.div`
  height: 32px;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: #fcfcfcb2;
  backdrop-filter: blur(10px);
  border-radius: 32px;
  color: #333333;
  font-size: 16px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
`

const ProgressHorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .material-icons {
    font-size: 16px;
    color: #666666;
  }
`

const ProgressStopButton = styled.div`
  //font-size: 16px;
  color: #cf2f1d;
`

const ProgressDivider = styled.div`
  width: 1px;
  height: 16px;
  background-color: #999999;
`

const ProgressIndicator = () => {
  return (
    <ProgressIndicatorContainer>
      <ProgressIndicatorBody>
        {/*<div className="material-icons">battery_charging_full</div>*/}
        <ProgressHorizontalContainer>
          <div className="material-icons">location_on</div>
          <div>2E</div>
        </ProgressHorizontalContainer>
        <ProgressHorizontalContainer>
          <div className="material-icons">timer</div>
          <div>2:08</div>
        </ProgressHorizontalContainer>
        <ProgressDivider />
        <ProgressStopButton className="material-icons">close</ProgressStopButton>
      </ProgressIndicatorBody>
    </ProgressIndicatorContainer>
  )
}

const TopBar = ({ onLogout }) => {
  const dispatch = useDispatch()
  const count = useSelector((state) => state.counter.count)

  return (
    <TopBarContainer>
      <TopBarAppHeaderContainer>
        <TopBarAppHeaderLogo className="material-icons">ac_unit</TopBarAppHeaderLogo>
        <TopBarAppHeaderText>EZCharge</TopBarAppHeaderText>
      </TopBarAppHeaderContainer>
      <TopBarFiller />
      <TopBarIconButton type="button" className="material-icons">
        power
      </TopBarIconButton>
      <TopBarIconButton
        type="button"
        className="material-icons"
        onClick={() => {
          logout()
          onLogout()
        }}
      >
        account_circle
      </TopBarIconButton>

      {/*<Button*/}
      {/*  onClick={() => {*/}
      {/*    logout()*/}
      {/*    onLogout()*/}
      {/*  }}*/}
      {/*>*/}
      {/*  Log Out*/}
      {/*</Button>*/}
    </TopBarContainer>
  )
}

const BottomBar = () => {
  return (
    <BottomBarContainer>
      <BottomBarAddressDropdown value="1000">
        <option value="1000">1000 Harbor Boulevard, Weehawken, NJ</option>
      </BottomBarAddressDropdown>
      <BottomBarFloorDropdown value="1">
        <option value="1">Level 1A</option>
        <option value="2">Level 2</option>
      </BottomBarFloorDropdown>
    </BottomBarContainer>
  )
}

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      svgContent: null,
    }
    this.svgContainerRef = React.createRef()
  }

  componentDidMount() {
    fetch('/map.svg')
      .then((response) => response.text())
      .then((data) =>
        this.setState({ svgContent: data }, () => {
          this.attachSvgEventListeners()
          this.updateSpots()
        })
      )
  }

  componentDidUpdate(prevProps) {
    const { spots } = this.props
    if (spots !== prevProps.spots) {
      this.updateSpots()
    }
  }

  attachSvgEventListeners() {
    const svg = this.svgContainerRef.current.querySelector('svg')
    const svgElements = svg.querySelectorAll('*')

    const elements = {}
    const rects = {}
    for (let child of svgElements) {
      if (child.id) {
        const match = child.id.match(/^spot-([a-zA-Z0-9]+)/)
        if (match) {
          const spot = match[1]
          if (elements[spot]) {
            elements[spot].push(child)
          } else {
            elements[spot] = [child]
          }

          if (child.id.endsWith('-rect')) {
            rects[spot] = child
          }
        }
      }
    }

    const spots = Object.keys(elements).sort()
    for (let spot of spots) {
      const spotElements = elements[spot]
      for (let element of spotElements) {
        element.style.cursor = 'pointer'
        element.addEventListener('click', () => this.onSpotClick(spot))
      }
    }

    this.spots = spots
    this.rects = rects
  }

  updateSpots() {
    const spots = this.props.spots
    const rects = this.rects
    if (rects) {
      for (let spot in rects) {
        const rect = rects[spot]
        if (spots.includes(spot)) {
          rect.style.fill = '#d3d3d3'
          rect.style.stroke = '#666666'
        } else {
          rect.style.fill = '#78b2c9'
          rect.style.stroke = '#007fff'
        }
      }
    }
  }

  onSpotClick(spot) {
    this.props.dispath(wsToggleSpot(spot))
  }

  render() {
    return <MapContainer ref={this.svgContainerRef} dangerouslySetInnerHTML={{ __html: this.state.svgContent }} />
  }
}

const CheckInPage = ({ onLogout }) => {
  const dispatch = useDispatch()
  const spots = useSelector((state) => state.checkIn.spots)

  useEffect(() => {
    dispatch(wsConnect())

    return () => {
      dispatch(wsDisconnect())
    }
  }, [])

  return (
    <AppContainer>
      <TopBar onLogout={onLogout} />
      <Map dispath={dispatch} spots={spots} />
      <ProgressIndicator />
      <BottomBar />
    </AppContainer>
  )
}

export default CheckInPage
