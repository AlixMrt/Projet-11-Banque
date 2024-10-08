import React from "react";

import iconChat from "../assets/icon-chat.webp";
import iconMoney from "../assets/icon-money.webp";
import iconSecurity from "../assets/icon-security.webp";

import Feature from "./Feature";
export default function Features() {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      <Feature
        iconSrc={iconChat}
        alt="Chat Icon"
        title="You are our #1 priority"
        description="Need to talk to a representative? You can get in touch through our
          24/7 chat or through a phone call in less than 5 minutes."
        key="Chat Icon"
      />
      <Feature
        iconSrc={iconMoney}
        alt="Money Icon"
        title="More savings means higher rates"
        description="The more you save with us, the higher your interest rate will be!"
        key="Money Icon"
      />
      <Feature
        iconSrc={iconSecurity}
        alt="Security Icon"
        title="Security you can trust"
        description="We use top of the line encryption to make sure your data and money is
          always safe."
        key="Security Icon"
      />
    </section>
  );
}
