import { Form, FormProps } from "app/core/components/Form"
import { LabeledInput } from "app/core/components/inputs/LabeledInput"
import { z } from "zod"
import { Card, Grid, Group, Space, Stack, Title } from "@mantine/core"
import { DatePicker, TimeInput } from "@mantine/dates"
import { Calendar, Clock, CurrencyDollar, Resize } from "tabler-icons-react"
import { MapInput } from "../../core/components/inputs/MapInput"
import { EventVisibility } from "db"
import { EnumInput } from "../../core/components/inputs/EnumInput"
import { ImageInput } from "../../core/components/inputs/ImageInput"
import { RichTextInput } from "../../core/components/inputs/RichTextInput"
import { MultiInput } from "../../core/components/inputs/MultiInput"

export { FORM_ERROR } from "app/core/components/Form"

export function EventForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <Grid gutter={50}>
        <Grid.Col span={12}>
          <Grid>
            <Grid.Col xs={12} md={6}>
              <Grid>
                <Grid.Col span={12}>
                  <LabeledInput
                    name="name"
                    label="Name"
                    placeholder="Event name"
                    required
                    icon={<Calendar size={16} />}
                  />
                </Grid.Col>

                <Grid.Col xs={12} md={6}>
                  <LabeledInput
                    name={"date"}
                    label="Date"
                    placeholder="When will this event happen?"
                    required
                    icon={<Calendar size={16} />}
                    InputComponent={({ ...props }) => (
                      <DatePicker {...props} minDate={new Date()} />
                    )}
                  />
                </Grid.Col>

                <Grid.Col xs={12} md={6}>
                  <LabeledInput
                    InputComponent={TimeInput}
                    name={"time"}
                    icon={<Clock size={16} />}
                    label="Time"
                    required
                  />
                </Grid.Col>

                <Grid.Col xs={12} md={6}>
                  <LabeledInput
                    type={"number"}
                    name={"capacity"}
                    label="Capacity"
                    placeholder={"maximum capacity"}
                    icon={<Resize size={16} />}
                    required
                  />
                </Grid.Col>

                <Grid.Col xs={12} md={6}>
                  <LabeledInput
                    name={"visibility"}
                    label={"Visibility"}
                    InputComponent={({ ...props }) => (
                      <EnumInput {...props} enumeration={EventVisibility} />
                    )}
                  />
                </Grid.Col>
              </Grid>
            </Grid.Col>

            <Grid.Col xs={12} md={6}>
              <ImageInput name={"images"} />
            </Grid.Col>
          </Grid>
        </Grid.Col>

        <Grid.Col span={12}>
          <MapInput label={"Location"} name={"location"} placeholder={"Where's the event?"} />
        </Grid.Col>

        <Grid.Col span={12}>
          <MultiInput
            name={"paymentOptions"}
            label={"Payment Options"}
            description={"If you leave this empty, the event will be free to enter"}
            buttonLabel={"Add ticket"}
            Input={({ name }) => (
              <Card>
                <Stack spacing={"md"}>
                  <Group>
                    <LabeledInput
                      outerProps={{ style: { flex: 2 } }}
                      name={`${name}.name`}
                      label={"Name"}
                      placeholder={"Title"}
                    />
                    <LabeledInput
                      outerProps={{ style: { flex: 1 } }}
                      icon={<CurrencyDollar size={16} />}
                      name={`${name}.price`}
                      type={"number"}
                      label={"price"}
                      placeholder={"Price"}
                    />
                  </Group>
                  <LabeledInput
                    name={`${name}.description`}
                    label={"description"}
                    placeholder={"Description"}
                    InputComponent={RichTextInput}
                  />
                </Stack>
              </Card>
            )}
          />
        </Grid.Col>
      </Grid>
    </Form>
  )
}
