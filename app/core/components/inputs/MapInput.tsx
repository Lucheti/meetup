import React, { forwardRef, useEffect, useState } from "react"
import { Map, Overlay } from "pigeon-maps"
import { LabeledTextFieldProps } from "./LabeledInput"
import { Avatar, createStyles, Input, InputWrapper, Paper, Space } from "@mantine/core"
import { useField } from "react-final-form"
import { Location as LocationIcon } from "tabler-icons-react"
import { Geolocation, OpencageApi } from "../../../../integrations/opencage"
import { useDebouncedValue } from "@mantine/hooks"
import { showNotification } from "@mantine/notifications"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { maptiler } from "pigeon-maps/providers"

//AIzaSyAHYhgY0bv-VdoZj-Yt9ujnCHJeqkIlWXk

const useStyles = createStyles((theme) => ({
  map: {
    borderRadius: theme.radius.md,
  },
  marker_point: {
    transform: "translate(5px,-10px)",
    width: 0,
    height: 0,
    border: "23px solid transparent",
    borderRight: "23px solid transparent",
    borderTop: "23px solid white",
    zIndex: 1,
  },
  marker: {
    zIndex: 2,
    border: "2px solid white",
  },
}))

export const MapInput = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, fieldProps, labelProps, ...props }, ref) => {
    const { classes } = useStyles()
    const user = useCurrentUser()
    const {
      input: { type, value, ...input },
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      ...fieldProps,
    })
    const {
      input: { onChange },
    } = useField<Geolocation>("coords", {})

    const [debouncedValue] = useDebouncedValue(value, 1000)
    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError
    const [center, setCenter] = useState<[number, number]>([0, 0])
    const [marker, setMarker] = useState<[number, number]>([0, 0])
    const [zoom, setZoom] = useState(13)

    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const location: Geolocation = { lat: coords.latitude, lng: coords.longitude }
          setCenter([location.lat, location.lng])
          onChange(location)
        },
        () =>
          showNotification({
            color: "red",
            message: "Could not get your location, please allow location in browser settings.",
          }),
        {
          enableHighAccuracy: true,
        }
      )
    }, [])

    useEffect(() => {
      if (debouncedValue) {
        console.log("debouncedValue", debouncedValue)
        console.log("value", value)
        OpencageApi.getGeolocationFromLocation(debouncedValue).then(({ lat, lng }) => {
          setCenter([lat, lng])
          setMarker([lat, lng])
          onChange({ lat, lng })
        })
      }
    }, [debouncedValue])

    return (
      <>
        <div {...outerProps}>
          <InputWrapper required label={label} error={touched && normalizedError}>
            <Input
              icon={<LocationIcon size={16} />}
              type={props.type}
              {...input}
              disabled={submitting}
              {...props}
              ref={ref}
            />
          </InputWrapper>
        </div>
        <Space h={"lg"} />
        <Paper withBorder p={"md"} radius={"md"}>
          <Map
            provider={maptiler("EW0wjl9ko1WAO0rnFzb0", "pastel")}
            boxClassname={classes.map}
            height={300}
            center={center}
            zoom={zoom}
            onBoundsChanged={({ center, zoom }) => {
              setCenter(center)
              setZoom(zoom)
            }}
          >
            <Overlay anchor={marker} offset={[0, 75]}>
              <Avatar
                size={"lg"}
                radius={"xl"}
                src={user?.images?.url_small}
                className={classes.marker}
              />
              <div className={classes.marker_point} />
            </Overlay>
          </Map>
        </Paper>
      </>
    )
  }
)
