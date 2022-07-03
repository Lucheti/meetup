import { Form, FormProps } from "app/core/components/Form"
import { z } from "zod"
import LabeledInput from "../../core/components/inputs/LabeledInput"
import { MultiInput } from "../../core/components/inputs/MultiInput"
import { Card, Group, Stack } from "@mantine/core"
import { ImageInput } from "../../core/components/inputs/ImageInput"
import { CurrencyDollar } from "tabler-icons-react"
import { RichTextInput } from "../../core/components/inputs/RichTextInput"

export { FORM_ERROR } from "app/core/components/Form"

export function ProviderForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledInput name="name" label="Name" placeholder="Name" />
      <ImageInput name={"images"} label={"Image"} required />
      <MultiInput
        name={"services"}
        label={"Services"}
        description={"Add the services that you offer"}
        buttonLabel={"Add service"}
        Input={({ name }) => (
          <Card>
            <Stack spacing={"md"}>
              <Group>
                <LabeledInput
                  outerProps={{ style: { flex: 2 } }}
                  name={`${name}.title`}
                  label={"title"}
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
    </Form>
  )
}
