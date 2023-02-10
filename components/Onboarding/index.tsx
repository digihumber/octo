import { Button, Spacer, Input, Container, Row, Col } from "@nextui-org/react";
import { useState } from "react";
export default function Onboarding() {
  const [apikey, setItems] = useState([]);
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
      const data = await res.json();
      localStorage.setItem("OctoAPI", `${event.target.userapi.value}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main>
      <Container>
        <h1>Let's get started </h1>
        <Row justify="center" align="center">
          <form onSubmit={callAPI}>
            <Input
              type="text"
              size="lg"
              underlined
              label="Your API Secret"
              placeholder="sk_live_..."
              color="primary"
              id="userapi"
              name="API"
            />
            <Spacer y={2.0} />
            <Button shadow color="gradient" type="submit">
              Save
            </Button>
          </form>
        </Row>
      </Container>
    </main>
  );
}
