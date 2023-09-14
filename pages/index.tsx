// React components imports
import { Button } from "@elenaorganisation/test"
type Props = {
  isLoading: boolean
}

const DashboardPage: React.FC<Props> = ({ isLoading }) => {
  return (
    <>
      <div>Hello</div>
      <Button>Huhu</Button>
    </>
  )
}

export default DashboardPage
