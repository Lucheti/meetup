import { Form, FormProps } from "app/core/components/Form"
import { LabeledInput } from "app/core/components/inputs/LabeledInput"
import { z } from "zod"
import { Chips, Chip, Grid, InputWrapper } from "@mantine/core"
import { DatePicker, TimeInput } from "@mantine/dates"
import { Calendar, Clock, Resize } from "tabler-icons-react"
import { MapInput } from "../../core/components/inputs/MapInput"
export { FORM_ERROR } from "app/core/components/Form"

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
            InputComponent={DatePicker}
            fieldProps={{
              validate: (value) => {
                console.log("Date validation: ", value)
                return false
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
          <InputWrapper label={"Visibility"} required>
            <Chips mt={"4px"}>
              <Chip value="react">Public</Chip>
              <Chip value="ng">Private</Chip>
            </Chips>
          </InputWrapper>
        </Grid.Col>

        <Grid.Col span={12}>
          <MapInput placeholder={"Where's the event?"} name={"location"} label={"Location"} />
        </Grid.Col>
      </Grid>
    </Form>
  )
}
