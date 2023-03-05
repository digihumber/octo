import {
  Button,
  Spacer,
  Input,
  Container,
  Link,
  Text,
  useInput,
} from "@nextui-org/react";
import { useState } from "react";
export default function Onboarding() {
  const [apikey, setItems] = useState([]);
  const heading = "Let's get started";
  const { value, reset, bindings } = useInput("");

  const callAPI = async (event) => {
    event.preventDefault();
    try {
      const electricityConsumption = `https://api.octopus.energy/v1/electricity-meter-points/2363003859117/meters/17P7313267/consumption/`;
      const res = await fetch(electricityConsumption, {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(`${event.target.userapi.value}`) + ":",
        },
      });
      console.log(res.status);
      if (res.status !== 200) {
        return {
          text: "Can't connected to Octopus Energy, check your API secret",
        };
      } else {
        const data = await res.json();
        localStorage.setItem("OctoAPI", `${event.target.userapi.value}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main>
      <Container>
        <Spacer y={2.0} />
        <Text h1>{heading}</Text>
        <Text>
          Enter your
          <Link
            href="https://octopus.energy/dashboard/developer/"
            block
            color="primary"
            underline
            isExternal
          >
            Octopus API key
          </Link>{" "}
          below. Your key will be saved locally and cannot be accessed by anyone
          other than you.
        </Text>
        <Spacer y={3.0} />
        <form onSubmit={callAPI}>
          <Input
            fullWidth={true}
            type="text"
            size="lg"
            underlined
            label="Your API Secret"
            placeholder="sk_live_..."
            color="primary"
            id="userapi"
            name="API"
            required
            pattern="[a-z0-9]{1,15}"
            title="Password should be digits (0 to 9) or alphabets (a to z)"
          />
          <Spacer y={2.0} />
          <Button shadow color="gradient" type="submit">
            Save
          </Button>
          <Spacer y={2.0} />
        </form>
      </Container>
    </main>
  );
}
