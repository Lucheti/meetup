import { useQuery } from "blitz"
import getCurrentUser from "app/users/queries/getCurrentUser"
import { User } from "db"

export const useCurrentUser = () => {
  const [user] = useQuery(getCurrentUser, null)
  return user
}
