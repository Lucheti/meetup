import { Form, FormProps } from "app/core/components/Form"
import { LabeledInput } from "app/core/components/inputs/LabeledInput"
import { z } from "zod"
import { Chips, Chip, Grid, InputWrapper } from "@mantine/core"
import { DatePicker, TimeInput } from "@mantine/dates"
import { Calendar, Clock, Resize } from "tabler-icons-react"
import { MapInput } from "../../core/components/inputs/MapInput"
export { FORM_ERROR } from "app/core/components/Form"
import { EventVisibility } from "db"
import { EnumInput } from "../../core/components/inputs/EnumInput"

export function EventForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <Grid>
        <Grid.Col xs={12} md={4}>
          <LabeledInput
            name="name"
            label="Name"
            placeholder="Event name"
            required
            icon={<Calendar size={16} />}
          />
        </Grid.Col>

        <Grid.Col xs={12} md={4}>
          <LabeledInput
            name={"date"}
            label="Date"
            placeholder="When will this event happen?"
            required
            icon={<Calendar size={16} />}
            InputComponent={({ ...props }) => <DatePicker {...props} minDate={new Date()} />}
            fieldProps={{
              validate: (value) => {
                console.log("Date validation: ", value)
                return undefined
              },
            }}
          />
        </Grid.Col>

        <Grid.Col xs={12} md={4}>
          <LabeledInput
            InputComponent={TimeInput}
            name={"time"}
            icon={<Clock size={16} />}
            label="Time"
            required
          />
        </Grid.Col>

        <Grid.Col xs={12} md={3}>
          <LabeledInput
            type={"number"}
            name={"capacity"}
            label="Capacity"
            placeholder={"maximum capacity"}
            icon={<Resize size={16} />}
            required
          />
        </Grid.Col>

        <Grid.Col xs={12} md={3}>
          <LabeledInput
            name={"visibility"}
            label={"Visibility"}
            InputComponent={({ ...props }) => (
              <EnumInput {...props} enumeration={EventVisibility} />
            )}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <MapInput name={"location"} placeholder={"Where's the event?"} label={"Location"} />
        </Grid.Col>
      </Grid>
    </Form>
  )
}
