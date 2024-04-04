import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Card, Flex, Text, TextField } from '@radix-ui/themes'
import { colors, space } from '../../styles/const'
import styled from 'styled-components'

export const MapSelector = () => {
  const [position, setPosition] = useState({ lat: 48.8566, lng: 2.3522 }) // Position initiale, par exemple Paris

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng)
      },
    })

    return position === null ? null : <Marker position={position}></Marker>
  }

  return (
    <Wrapper>
      <MapStyled center={position} zoom={13}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapStyled>
      <Flex align="center" style={{ marginTop: space[5] }} gap="3">
        <Flex align="center" gap="2">
          <Text>Latitude:</Text>
          <TextField.Root
            type="number"
            value={position.lat}
            onChange={(e) =>
              setPosition({ ...position, lat: parseFloat(e.target.value) })
            }
          />
        </Flex>
        <Flex align="center" gap="2">
          <Text>Longitude:</Text>
          <TextField.Root
            type="number"
            value={position.lng}
            onChange={(e) =>
              setPosition({ ...position, lng: parseFloat(e.target.value) })
            }
          />
        </Flex>
      </Flex>
    </Wrapper>
  )
}

const MapStyled = styled(MapContainer)`
  height: 400px;
  width: 99%;
  border-radius: ${space[2]};
  overflow: hidden;
  border: 1px solid ${colors.deepBlack};
`

const Wrapper = styled.div`
  min-width: 800px;
`
