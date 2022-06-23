import { z } from "zod"
import { Form, FormProps } from "../../../core/components/Form"
import { Grid } from "@mantine/core"
import { LabeledInput } from "../../../core/components/inputs/LabeledInput"
import { Calendar, Clock } from "tabler-icons-react"
import { Sex } from "../../../../db"
import { EnumInput } from "../../../core/components/inputs/EnumInput"
import { UserImageUpload } from "../userImageUpload/UserImageUpload"
import { showNotification } from "@mantine/notifications"
import { invalidateQuery, useMutation } from "blitz"
import getUser from "../../queries/getUser"
import updateUserMutation from "../../mutations/updateUser"

export function UserForm({ user }: { user: any }) {
  const [updateUser] = useMutation(updateUserMutation)

  return (
    <Form
      initialValues={user || {}}
      onSubmit={async (values) => {
        await updateUser(values)
        showNotification({
          message: "User data updated!",
        })
        invalidateQuery(getUser)
      }}
      submitText="Update data"
    >
      <Grid>
        <Grid.Col span={6}>
          <LabeledInput
            name="name"
            label="Name"
            placeholder="Name"
            required
            icon={<Calendar size={16} />}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <LabeledInput
            name="lastName"
            label="Last name"
            placeholder="Last name"
            required
            icon={<Calendar size={16} />}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <LabeledInput
            name={"sex"}
            icon={<Clock size={16} />}
            label="Sex"
            required
            InputComponent={({ ...props }) => <EnumInput {...props} enumeration={Sex} />}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <LabeledInput
            name="email"
            label="Email"
            placeholder="Email"
            required
            icon={<Calendar size={16} />}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <LabeledInput
            name="username"
            label="Username"
            placeholder="Username"
            required
            icon={<Calendar size={16} />}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <UserImageUpload />
        </Grid.Col>
      </Grid>
    </Form>
  )
}
