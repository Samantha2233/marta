import { useEffect } from "react";
import { Flex, useMediaQuery } from '@chakra-ui/react'
import { useStore } from '../store'
import { capitalize } from "../utils";

const RailMap = ( ) =>  {
  const startingPoint = useStore((state) => state.startingPoint)
  const destination = useStore((state) => state.destination)
  const setStartingPoint = useStore((state) => state.setStartingPoint)
  const setDestination = useStore((state) => state.setDestination)
  const [isSmallerThan800] = useMediaQuery('(max-width: 800px)')

  useEffect(() => {
    setUp()
  }, [])

  useEffect(() => {
    // Highlight selected stations upon load
    startingPoint?.label !== '' && highlightStation(startingPoint.label)
    destination?.label !== '' && highlightStation(destination.label)

    // Remove highlight from unselected stations
    const ctx = document.getElementById("svg")
    let rectangles = ctx?.getElementsByTagName('rect') 
    if(rectangles?.length) {
      for (let x = 0; x < rectangles?.length; x++) {
        if(rectangles[x].dataset.name !== startingPoint.label && rectangles[x].dataset.name !== destination.label) {
          removeStationHighlight(rectangles[x].dataset.name)
        }
      }
    }
  }, [startingPoint.label , destination.label])

  const setUp = () => {
    // Add cursor: pointer
    const ctx = document.getElementById("svg")
    let circles = ctx?.getElementsByTagName('circle') 
    let stationNames = ctx?.getElementsByTagName('text') 
    if(circles?.length) {
      for (let x = 0; x < circles.length; x++) {
        circles[x].setAttribute('cursor', 'pointer')
      }
    }
    if(stationNames?.length) {
      for (let x = 0; x < stationNames.length; x++) {
        stationNames[x].setAttribute('cursor', 'pointer')
      }
    }
  }
  

  // select station as startingPoint or destination
  const selectStation = (station: any) => {
    if(startingPoint.value === station.value) {
      setStartingPoint({value: "", label: ""})
      return
    }
    if(destination.value === station.value) {
      setDestination({value: "", label: ""})
      return
    }
    if (startingPoint.value === '') {
      setStartingPoint(station)
    } else if (destination.value === '') {
      setDestination(station)
    } else {
      setDestination(station)
    }
  }

  const highlightStation = (name: string) => {

    const capitalizedName = capitalize(name || '') 
    const textElm = document.getElementById(capitalizedName) as unknown as SVGGraphicsElement
    // add background rectangle
    const existingRec = document.getElementById(`rectangle-${capitalizedName}`)
    if(textElm && existingRec == null) {
      textElm.setAttribute('fill', 'white')
      const SVGRect = textElm?.getBBox() 
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", (SVGRect.x - 3).toString());
      rect.setAttribute("y", (SVGRect.y - 3).toString());
      rect.setAttribute("rx", '6');
      rect.setAttribute("width", (SVGRect.width + 6).toString());
      rect.setAttribute("height", (SVGRect.height + 6).toString());
      rect.setAttribute("fill", "black");
      rect.setAttribute("id", `rectangle-${capitalizedName}`);
      rect.setAttribute('data-name', name)
      textElm?.parentElement?.insertBefore(rect, textElm)
    }
    // fill circle
    const stationCircle = document.querySelector(`[data-name="${capitalizedName}"]`) 
    stationCircle?.setAttribute('fill', 'black')
  }

  const removeStationHighlight = (name: string) => {
    const capitalizedName = capitalize(name || '') 
    if(capitalizedName !== startingPoint.label && capitalizedName !== destination.label) {
      const textElm = document.getElementById(capitalizedName) 
      if(textElm) {
        textElm.setAttribute('fill', 'black')
        const rect = document.getElementById(`rectangle-${capitalizedName}`)
        rect?.parentElement?.removeChild(rect)
      }
      const stationCircle = document.querySelector(`[data-name="${capitalizedName}"]`) 
      stationCircle?.setAttribute('fill', 'white')
    }
  }


  return (
    <Flex justifyContent='center' w='100%'>
      <svg 
          height={isSmallerThan800 ? undefined : '100vh' } 
          width={isSmallerThan800 ? '100%' : undefined} 
          viewBox='0 0 800 1200' 
          id='svg'
        >
        <g fill='none' strokeWidth={8}>
          {/* Red Line */}
          <path
            d='m44.01 1137.2 211.07-365.58s6.583-11.401 9.99-24.118 3.407-25.882 3.407-25.882V592.56s0-21.483 8.221-41.33 23.411-35.038 23.411-35.038l13.79-13.789s14.064-14.065 21.676-32.442 7.612-38.268 7.612-38.268V78.773'
            stroke='#ec2527'
            strokeOpacity={0.941}
            data-item='red'
          />
          {/* Orange Line */}
          <path
            d='M593.5 234.13 305.76 521.87s-14.065 14.065-21.677 32.442-7.612 38.268-7.612 38.268v129.06s0 14.218-3.68 27.952-10.789 26.048-10.789 26.048l-211.07 365.58'
            stroke='orange'
          />
          {/* Blue Line */}
          <path d='M22.475 753.5h725' stroke='#0093d0' />
          {/* Green Line */}
          <path
            d='M422.47 745.5H209.76s-16.973 0-30.438-10.332-17.858-26.727-17.858-26.727l-1.94-7.237'
            stroke='#69bd47'
          />
        </g>
        <g fill='#fff' stroke='#000' strokeLinecap='square' strokeLinejoin='bevel'>
          <circle cx={272.47} cy={749.5} r={8.5} strokeWidth={4} data-name={'Five Points Station'}
             onClick={(e) => {
              selectStation({
                value: e?.currentTarget?.dataset?.name.toUpperCase(),
                label: capitalize(e?.currentTarget?.dataset?.name || '')
              })
            }}
            onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
            onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
          /> // Five Points (Center)

          <g strokeWidth={3.5}>
            <circle cx={247.47} cy={749.5} r={7} data-name={'Cnn Center Station'}
               onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // W1

            <circle cx={222.47} cy={749.5} r={7} data-name={'Vine City Station'}
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // W2

            <circle cx={197.47} cy={749.5} r={7} data-name={'Ashby Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // W3
            <circle cx={322.47} cy={749.5} r={7} data-name={'King Memorial Station'} 
               onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // E2
            <circle cx={372.47} cy={749.5} r={7} data-name={'Inman Park Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            />// E3
            <circle cx={422.47} cy={749.5} r={7} data-name={'Edgewood Candler Park Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            />  // E4
            <circle cx={497.47} cy={753.5} r={7} data-name={'East Lake Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // E5
            <circle cx={597.47} cy={753.5} r={7} data-name={'Avondale Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // E7
            <circle cx={672.47} cy={753.5} r={7} data-name={'Kensington Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // E8
            <circle cx={747.47} cy={753.5} r={7} data-name={'Indian Creek Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // E9
            <circle cx={272.47} cy={724.5} r={7} data-name={'Peachtree Center Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // N1
            <circle cx={272.47} cy={699.5} r={7} data-name={'Civic Center Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // N2
            <circle cx={272.47} cy={674.5} r={7} data-name={'North Ave Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // N3
            <circle cx={272.47} cy={649.5} r={7} data-name={'Midtown Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // N4
            <circle cx={272.47} cy={624.5} r={7} data-name={'Arts Center Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // N5
            <circle cx={325.51} cy={496.47} r={7} data-name={'Lindbergh Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // N6
            <circle cx={343.19} cy={403.79} r={7} data-name={'Buckhead Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // N7
            <circle cx={381.37} cy={446.26} r={7} data-name={'Lenox Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // NE7
            <circle cx={522.79} cy={304.84} r={7} data-name={'Chamblee Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // NE9
            <circle cx={593.5} cy={234.13} r={7} data-name={'Doraville Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // NE10
            <circle cx={343.19} cy={228.79} r={7} data-name={'Medical Center Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // N8 
            <circle cx={343.19} cy={178.79} r={7} data-name={'Dunwoody Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // N9
            <circle cx={343.18} cy={128.79} r={7} data-name={'Sandy Springs Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // N10
            <circle cx={343.18} cy={78.791} r={7} data-name={'North Springs Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // N11
            <circle cx={434.4} cy={393.23} r={7} data-name={'Brookhaven Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // NE8
            <circle cx={159.53} cy={701.21} r={7} data-name={'Bankhead Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // P4
            <circle cx={122.47} cy={753.5} r={7} data-name={'West Lake Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // W4
            <circle cx={22.475} cy={753.5} r={7} data-name={'Hamilton E Holmes Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // W5
            <circle cx={234.97} cy={814.45} r={7} data-name={'West End Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // S2
            <circle cx={197.47} cy={879.41} r={7} data-name={'Oakland City Station'} 
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // S3
            <circle cx={159.97} cy={944.36} r={7} data-name={'Lakewood Station'}
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // S4
            <circle cx={72.474} cy={1095.9} r={7} data-name={'College Park Station'}
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // S6
            <circle cx={47.474} cy={1139.2} r={7} data-name={'Airport Station'}
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // S7
            <circle cx={297.47} cy={749.5} r={7} data-name={'Georgia State Station'}
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // E1
            <circle cx={259.97} cy={771.15} r={7} data-name={'Garnett Station'}
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // S1
            <circle cx={122.47} cy={1009.3} r={7} data-name={'East Point Station'}
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            />  // S5
            <circle cx={547.47} cy={753.5} r={7} data-name={'Decatur Station'}
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            /> // E6
          </g>
        </g>
        <g fontFamily='sans-serif' letterSpacing={-0.5} wordSpacing={0}>
          <g fontSize={21.333}>
            <text
              id='North Springs Station'
              data-name='North Springs Station'
              x={360.079}
              y={86.881}
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={360.079} y={86.881}>
                <tspan fontSize={16} fontWeight='bold'>
                  {"(N11) "}
                </tspan>
                {"North Springs"}
              </tspan>
            </text>
            <text
              id='Sandy Springs Station'
              data-name='Sandy Springs Station'
              x={360.079}
              y={136.881}
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={360.079} y={136.881}>
                <tspan fontSize={16} fontWeight='bold'>
                  {"(N10) "}
                </tspan>
                {"Sandy Springs"}
              </tspan>
            </text>
            <text
              id='Dunwoody Station'
              data-name='Dunwoody Station'
              x={360.079}
              y={186.881}
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={360.079} y={186.881}>
                <tspan fontSize={16} fontWeight='bold'>
                  {"(N9) "}
                </tspan>
                {"Dunwoody"}
              </tspan>
            </text>
            <text
              id='Medical Center Station'
              data-name='Medical Center Station'
              x={360.079}
              y={236.881}
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={360.079} y={236.881}>
                <tspan fontSize={16} fontWeight='bold'>
                  {"(N8) "}
                </tspan>
                {"Medical Center"}
              </tspan>
            </text>

            <text
              id='Buckhead Station'
              data-name={'Buckhead Station'}
              x={326.791}
              y={411.881}
              textAnchor='end'
              style={{
                lineHeight: 0.89999998,
                cursor: 'pointer'
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={326.291} y={411.881} 
              >
                {"Buckhead"}
                <tspan fontSize={16} fontWeight='bold'>
                  {" (N7)"}
                </tspan>
              </tspan>
            </text>

            <text
              id='Lenox Station'
              data-name='Lenox Station'
              x={400.335}
              y={462.513}
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={400.335} y={462.513}>
                <tspan fontSize={16} fontWeight='bold'>
                  {"(NE7) "}
                </tspan>
                {"Lenox"}
              </tspan>
            </text>
            <text
              id='Brookhaven Station'
              data-name='Brookhaven Station'
              x={453.368}
              y={409.48}
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={453.368} y={409.48}>
                <tspan fontSize={16} fontWeight='bold'>
                  {"(NE8) "}
                </tspan>
                {"Brookhaven /"}
              </tspan>
              <tspan x={453.368} y={428.68}>
                {"Oglethorpe"}
              </tspan>
            </text>
            <text
              id='Chamblee Station'
              data-name='Chamblee Station'
              x={541.756}
              y={321.092}
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={541.756} y={321.092}>
                <tspan fontSize={16} fontWeight='bold'>
                  {"(NE9) "}
                </tspan>
                {"Chamblee"}
              </tspan>
            </text>
            <text
              id='Doraville Station'
              data-name='Doraville Station'
              x={612.467}
              y={250.381}
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={612.467} y={250.381}>
                <tspan fontSize={16} fontWeight='bold'>
                  {"(NE10) "}
                </tspan>
                {"Doraville"}
              </tspan>
            </text>
            <text
              id='Lindbergh Station'
              data-name={'Lindbergh Station'}
              x={344.474}
              y={512.718}
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={344.474} y={512.718}>
                <tspan fontSize={16} fontWeight='bold'>
                  {"(N6) "}
                </tspan>
                {"Lindbergh Center"}
              </tspan>
            </text>
            <text
              id='Five Points Station'
              data-name='FIVE POINTS Station'
              x={306.25}
              y={720}
              fontWeight='bold'
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={306.25} y={720}>
                {"FIVE POINTS"}
              </tspan>
            </text>
            <text
              id='Peachtree Center Station'
              data-name='Peachtree Center Station'
              x={305}
              y={690}
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={305} y={690}>
                <tspan fontSize={16} fontWeight='bold'>
                  {"(N1) "}
                </tspan>
                {"Peachtree Ctr"}
              </tspan>
            </text>
            <text
              id='Civic Center Station'
              data-name='Civic Center Station'
              x={303.75}
              y={660}
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={303.75} y={660}>
                <tspan fontSize={16} fontWeight='bold'>
                  {"(N2) "}
                </tspan>
                {"Civic Ctr"}
              </tspan>
            </text>
            <text
              id='North Ave Station'
              data-name='North Ave Station'
              x={302.5}
              y={630}
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={302.5} y={630}>
                <tspan fontSize={16} fontWeight='bold'>
                  {"(N3) "}
                </tspan>
                {"North Ave"}
              </tspan>
            </text>
            <text
              id='Midtown Station'
              data-name='Midtown Station'
              x={301.25}
              y={600}
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={301.25} y={600}>
                <tspan fontSize={16} fontWeight='bold'>
                  {"(N4) "}
                </tspan>
                {"Midtown"}
              </tspan>
            </text>
            <text
              id='Arts Center Station'
              data-name='Arts Center Station'
              x={300}
              y={570}
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={300} y={570}>
                <tspan fontSize={16} fontWeight='bold'>
                  {"(N5) "}
                </tspan>
                {"Arts Ctr"}
              </tspan>
            </text>
            <text
              id='Hamilton E Holmes Station'
              data-name='Hamilton E Holmes Station'
              x={5}
              y={720}
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={5} y={720}>
                {"H.E. Holmes "}
              </tspan>
              <tspan x={5} y={739.2} fontSize={16} fontWeight='bold'>
                {"(W5)"}
              </tspan>
            </text>
            <text
              id='West Lake Station'
              data-name='West Lake Station'
              x={115.25}
              y={780}
              textAnchor='middle'
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={115} y={780} fontSize={16} fontWeight='bold'>
                {"(W4)"}
              </tspan>
              <tspan x={115} y={799.2}>
                {"West"}
              </tspan>
              <tspan x={115} y={818.4}>
                {"Lake"}
              </tspan>
            </text>
            <text
              id='Bankhead Station'
              data-name='Bankhead Station'
              x={159.073}
              y={688.755}
              textAnchor='end'
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={158.573} y={688.755}>
                {"Bankhead"}
                <tspan fontSize={16} fontWeight='bold'>
                  {" (P4)"}
                </tspan>
              </tspan>
            </text>
            <g textAnchor='middle'>
              <text
                id='Vine City Station'
                data-name='Vine City Station'
                x={217.724}
                y={689.502}
                style={{
                  lineHeight: 0.89999998,
                }}
                xmlSpace='preserve'
                onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
              >
                <tspan x={217.474} y={689.502}>
                  {"Vine"}
                </tspan>
                <tspan x={217.474} y={708.702}>
                  {"City"}
                </tspan>
                <tspan x={217.474} y={727.902} fontSize={16} fontWeight='bold'>
                  {"(W2)"}
                </tspan>
              </text>
              <text
                id='Cnn Center Station'
                data-name='Cnn Center Station'
                x={184.224}
                y={629.502}
                style={{
                  lineHeight: 0.89999998,
                }}
                xmlSpace='preserve'
                onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
              >
                <tspan x={187.474} y={629.502}>
                  {"GWCC / "}
                </tspan>
                <tspan x={186.459} y={648.702} fontSize={16} fontWeight='bold'>
                  <tspan fontSize={21.333} fontWeight='normal'>
                    {"CNN Ctr "}
                  </tspan>
                  {"(W1)     "}
                </tspan>
              </text>
              <text
                id='Ashby Station'
                data-name='Ashby Station'
                x={190.25}
                y={780}
                style={{
                  lineHeight: 0.89999998,
                }}
                xmlSpace='preserve'
                onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
              >
                <tspan x={190} y={780} fontSize={16} fontWeight='bold'>
                  {"(W3)"}
                </tspan>
                <tspan x={190} y={799.2}>
                  {"Ashby"}
                </tspan>
              </text>
            </g>
            <text
              id='Garnett Station'
              data-name='Garnett Station'
              x={247.5}
              y={880}
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={247.5} y={880}>
                <tspan fontSize={16} fontWeight='bold'>
                  {"(S1) "}
                </tspan>
                {"Garnett"}
              </tspan>
            </text>
            <text
              id='West End Station'
              data-name='West End Station'
              x={225}
              y={910}
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={225} y={910}>
                <tspan fontSize={16} fontWeight='bold'>
                  {"(S2) "}
                </tspan>
                {"West End"}
              </tspan>
            </text>
            <text
              id='Oakland City Station'
              data-name='Oakland City Station'
              x={187.672}
              y={872.348}
              textAnchor='end'
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={187.172} y={872.348}>
                {"Oakland City"}
                <tspan fontSize={16} fontWeight='bold'>
                  {" (S3)"}
                </tspan>
              </tspan>
            </text>
            <text
              id='College Park Station'
              data-name='College Park Station'
              x={95}
              y={1106.699}
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={95} y={1106.699}>
                <tspan fontSize={16} fontWeight='bold'>
                  {"(S6) "}
                </tspan>
                {"College Park"}
              </tspan>
            </text>
            <text
              id='Airport Station'
              data-name='Airport Station'
              x={70}
              y={1150}
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={70} y={1150}>
                <tspan fontSize={16} fontWeight='bold'>
                  {"(S7) "}
                </tspan>
                {"Airport"}
              </tspan>
            </text>
            <text
              id='Lakewood Station'
              data-name='Lakewood Station'
              x={182.5}
              y={955.144}
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={182.5} y={955.144}>
                <tspan fontSize={16} fontWeight='bold'>
                  {"(S4) "}
                </tspan>
                {"Lakewood /"}
              </tspan>
              <tspan x={182.5} y={974.344}>
                {"Fort McPherson"}
              </tspan>
            </text>
            <text
              id='East Point Station'
              data-name='East Point Station'
              x={145}
              y={1020.096}
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={145} y={1020.096}>
                <tspan fontSize={16} fontWeight='bold'>
                  {"(S5) "}
                </tspan>
                {"East Point"}
              </tspan>
            </text>
            <text
              id='Georgia State Station'
              data-name='Georgia State Station'
              x={270}
              y={850}
              style={{
                lineHeight: 0.89999998,
              }}
              xmlSpace='preserve'
              onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
            >
              <tspan x={270} y={850}>
                <tspan fontSize={16} fontWeight='bold'>
                  {"(E1) "}
                </tspan>
                {"Georgia State"}
              </tspan>
            </text>
            <g textAnchor='middle'>
              <text
                id='Indian Creek Station'
                data-name='Indian Creek Station'
                x={747.724}
                y={783.502}
                style={{
                  lineHeight: 0.89999998,
                }}
                xmlSpace='preserve'
                onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
              >
                <tspan x={747.474} y={783.502}>
                  <tspan fontSize={16} fontWeight='bold'>
                    {"(E9)"}
                  </tspan>
                </tspan>
                <tspan x={747.474} y={802.702}>
                  {"Indian"}
                </tspan>
                <tspan x={747.474} y={821.902}>
                  {"Creek"}
                </tspan>
              </text>
              <text
                id='Avondale Station'
                data-name='Avondale Station'
                x={597.724}
                y={783.502}
                style={{
                  lineHeight: 0.89999998,
                }}
                xmlSpace='preserve'
                onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
              >
                <tspan x={597.474} y={783.502} fontSize={16} fontWeight='bold'>
                  {"(E7)"}
                </tspan>
                <tspan x={597.474} y={802.702}>
                  {"Avondale"}
                </tspan>
              </text>
              <text
                id='Decatur Station'
                data-name='Decatur Station'
                xmlSpace='preserve'
                onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
              >
                <tspan x={547.474} y={713.502}>
                  {"Decatur"}
                </tspan>
                <tspan x={547.474} y={732.702} fontSize={16} fontWeight='bold'>
                  {"(E6)"}
                </tspan>
              </text>
              <text
                id='East Lake Station'
                data-name='East Lake Station'
                x={517.724}
                y={843.502}
                style={{
                  lineHeight: 0.89999998,
                }}
                xmlSpace='preserve'
                onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
              >
                <tspan x={517.474} y={843.502} fontSize={16} fontWeight='bold'>
                  {"(E5)"}
                </tspan>
                <tspan x={517.474} y={862.702}>
                  {"East"}
                </tspan>
                <tspan x={517.474} y={881.902}>
                  {"Lake"}
                </tspan>
              </text>
              <text
                id='Edgewood Candler Park Station'
                data-name='Edgewood Candler Park Station'
                x={546.75}
                y={600}
                style={{
                  lineHeight: 0.89999998,
                }}
                xmlSpace='preserve'
                onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
              >
                <tspan x={550} y={600}>
                  {"Edgewood / "}
                </tspan>
                <tspan x={546.5} y={619.2}>
                  {"Candler Park"}
                </tspan>
                <tspan x={546.5} y={638.4} fontSize={16} fontWeight='bold'>
                  {"(E4)"}
                </tspan>
              </text>
            </g>
          </g>
          <text
            id='Inman Park Station'
            data-name='Inman Park Station'
            x={382.724}
            y={777.002}
            fontSize={16}
            textAnchor='middle'
            style={{
              lineHeight: 0.89999998,
            }}
            xmlSpace='preserve'
            onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
          >
            <tspan x={382.474} y={777.002}>
              <tspan fontSize={13.333} fontWeight='bold'>
                {"(E3) "}
              </tspan>
              {"Inman Park /"}
            </tspan>
            <tspan x={382.474} y={791.402}>
              {"Reynoldstown"}
            </tspan>
          </text>
          <text
            id='King Memorial Station'
            data-name='KING MEMORIAL Station'
            x={292.5}
            y={820}
            fontSize={21.333}
            style={{
              lineHeight: 0.89999998,
            }}
            xmlSpace='preserve'
            onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
          >
            <tspan x={292.5} y={820}>
              <tspan fontSize={16} fontWeight='bold'>
                {"(E2) "}
              </tspan>
              {"King Memorial"}
            </tspan>
          </text>
        </g>
        <g fill='none' stroke='#000'>
          <path d='M303.75 712.5h-10l-21.276 37.002M302.5 682.5h-10l-20.026 42.002M301.25 652.5h-10l-18.776 47.002M300 622.5h-10l-17.526 52.002M298.75 592.5h-10l-16.276 57.002M297.5 562.5h-10l-15.026 62.002M247.47 749.5v-125h-20M234.97 814.45v75.547M260 770v90M280 830v-20l17.474-60.498M300 800v-20l22.474-30.498M550 640v20l-127.53 89.502' />
        </g>
        <text
          id='Kensington Station'
          data-name='Kensington Station'
          x={672.724}
          y={713.502}
          fontFamily='sans-serif'
          fontSize={21.333}
          letterSpacing={-0.5}
          textAnchor='middle'
          wordSpacing={0}
          style={{
            lineHeight: 0.89999998,
          }}
          xmlSpace='preserve'
          onClick={(e) => {
                selectStation({
                  value: e?.currentTarget?.dataset?.name.toUpperCase(),
                  label: capitalize(e?.currentTarget?.dataset?.name || '')
                })
              }}
              onMouseEnter={(e) => highlightStation(e?.currentTarget?.dataset?.name)}
              onMouseLeave={(e) => removeStationHighlight(e?.currentTarget?.dataset?.name)}
        >
          <tspan x={672.474} y={713.502}>
            {"Kensington"}
          </tspan>
          <tspan x={672.474} y={732.702} fontSize={16} fontWeight='bold'>
            {"(E8)"}
          </tspan>
        </text>
        <g fill='none' stroke='#000'>
          <path d='M497.47 843.5v-90M22.475 753.5v-13.501M122.47 753.5v11.498M197.47 749.5v11.498M222.47 749.5v-13.501M372.47 749.5v11.498M547.47 753.5v-13.501M597.47 753.5v11.498M672.47 753.5v-13.501M747.47 753.5v11.498' />
        </g>
      </svg>
    </Flex>
  )
};
export default RailMap;
