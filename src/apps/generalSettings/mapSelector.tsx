import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { Flex, Text, TextField } from '@radix-ui/themes'
import styled from 'styled-components'
import 'leaflet/dist/leaflet.css'

import { colors, space } from '../../styles/const'
import { Control } from 'react-hook-form'

interface Props {
  size: number
  location: { lat: string; lng: string }
  setLocation: (location: { lat: string; lng: string }) => void
  isInputs?: boolean
  control?: Control<any>
}

export const MapSelector = ({
  size,
  location,
  setLocation,
  isInputs,
}: Props) => {
  const LocationMarker = () => {
    useMapEvents({
      click(e: any) {
        setLocation(e.latlng)
      },
    })

    return location === null ? null : <Marker position={location}></Marker>
  }

  return (
    <Wrapper size={size}>
      <MapStyled center={location} zoom={13}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapStyled>
      {isInputs && (
        <Flex align="center" style={{ marginTop: space[5] }} gap="3">
          <Flex align="center" gap="2">
            <Text>Latitude:</Text>
            <TextField.Root
              type="number"
              placeholder="Latitude"
              value={location.lat}
              onChange={(e) =>
                setLocation({
                  ...location,
                  lat: e.target.value,
                })
              }
            />
          </Flex>
          <Flex align="center" gap="2">
            <Text>Longitude:</Text>
            <TextField.Root
              type="number"
              placeholder="Longitude"
              value={location.lng}
              onChange={(e) =>
                setLocation({
                  ...location,
                  lng: e.target.value,
                })
              }
            />
          </Flex>
        </Flex>
      )}
    </Wrapper>
  )
}

const MapStyled = styled(MapContainer)`
  height: 400px;
  min-width: 99%;
  border-radius: ${space[2]};
  overflow: hidden;
  border: 1px solid ${colors.deepBlack};
`

const Wrapper = styled.div<{ size: number }>`
  min-width: ${`${(props: { size: number }) => props.size}px`};
`
