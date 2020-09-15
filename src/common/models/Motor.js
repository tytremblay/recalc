import Qty from "js-quantities";
import keyBy from "lodash/keyBy";
import { decodeObject, encodeObject } from "use-query-params";

export default class Motor {
  constructor(quantity, name, data) {
    this.quantity = quantity;
    this.name = name;

    data = data || motorMap[name];
    this.url = data.url;
    this.freeSpeed = data.freeSpeed;
    this.stallTorque = data.stallTorque;
    this.stallCurrent = data.stallCurrent;
    this.freeCurrent = data.freeCurrent;
    this.weight = data.weight;
    this.power = this.freeSpeed
      .div(2)
      .mul((2 * Math.PI) / 60)
      .mul(this.stallTorque)
      .div(2)
      .mul(Qty(1, "1/rpm"))
      .mul(Qty(1, "1/s"));
    this.resistance = Qty(12, "V").div(this.stallCurrent);
  }

  static get choices() {
    return Object.keys(motorMap);
  }

  toDict() {
    return {
      quantity: this.quantity,
      name: this.name,
    };
  }

  static fromDict(dict) {
    return new Motor(dict.quantity, dict.name);
  }

  static encode(motor) {
    return encodeObject(motor.toDict());
  }

  static decode(string) {
    return Motor.fromDict(decodeObject(string));
  }

  static getParam() {
    return {
      encode: Motor.encode,
      decode: Motor.decode,
    };
  }

  static getAllMotors() {
    return Object.keys(motorMap).map((n) => new Motor(1, n));
  }
}

const motorMap = keyBy(
  [
    {
      name: "Falcon 500",
      freeSpeed: Qty(6380, "rpm"),
      stallTorque: Qty(4.69, "N*m"),
      stallCurrent: Qty(257, "A"),
      freeCurrent: Qty(1.5, "A"),
      weight: Qty(1.1, "lb"),
      url: "https://www.vexrobotics.com/217-6515.html",
    },
    {
      name: "NEO",
      freeSpeed: Qty(5676, "rpm"),
      stallTorque: Qty(2.6, "N*m"),
      stallCurrent: Qty(105, "A"),
      freeCurrent: Qty(1.8, "A"),
      weight: Qty(0.94, "lb"),
      url: "https://www.revrobotics.com/rev-21-1650/",
    },
    {
      name: "775pro",
      freeSpeed: Qty(18730, "rpm"),
      stallTorque: Qty(0.71, "N*m"),
      stallCurrent: Qty(134, "A"),
      freeCurrent: Qty(0.7, "A"),
      weight: Qty(0.8, "lb"),
      url: "https://www.vexrobotics.com/775pro.html",
    },
    {
      name: "NEO 550",
      freeSpeed: Qty(11000, "rpm"),
      stallTorque: Qty(0.97, "N*m"),
      stallCurrent: Qty(100, "A"),
      freeCurrent: Qty(1.4, "A"),
      weight: Qty(0.31, "lb"),
      url: "https://www.revrobotics.com/rev-21-1651/",
    },
    {
      name: "CIM",
      freeSpeed: Qty(5330, "rpm"),
      stallTorque: Qty(2.41, "N*m"),
      stallCurrent: Qty(131, "A"),
      freeCurrent: Qty(2.7, "A"),
      weight: Qty(2.82, "lb"),
      url: "https://www.vexrobotics.com/217-2000.html",
    },
    {
      name: "MiniCIM",
      freeSpeed: Qty(5840, "rpm"),
      stallTorque: Qty(1.41, "N*m"),
      stallCurrent: Qty(89, "A"),
      freeCurrent: Qty(3, "A"),
      weight: Qty(2.16, "lb"),
      url: "https://www.vexrobotics.com/217-3371.html",
    },
    {
      name: "BAG",
      freeSpeed: Qty(13180, "rpm"),
      stallTorque: Qty(0.43, "N*m"),
      stallCurrent: Qty(53, "A"),
      freeCurrent: Qty(1.8, "A"),
      weight: Qty(0.71, "lb"),
      url: "https://www.vexrobotics.com/217-3351.html",
    },
    {
      name: "AM-9015",
      freeSpeed: Qty(16000, "rpm"),
      stallTorque: Qty(0.428, "N*m"),
      stallCurrent: Qty(63.8, "A"),
      freeCurrent: Qty(1.2, "A"),
      weight: Qty(0.5, "lb"),
      url: "https://www.andymark.com/products/9015-motor",
    },
    {
      name: "NeveRest",
      freeSpeed: Qty(6600, "rpm"),
      stallTorque: Qty(0.06178858, "N*m"),
      stallCurrent: Qty(11.5, "A"),
      freeCurrent: Qty(0.4, "A"),
      weight: Qty(0.587, "lb"),
      url: "https://www.andymark.com/products/neverest-series-motor-only",
    },
    {
      name: "Snowblower",
      freeSpeed: Qty(100, "rpm"),
      stallTorque: Qty(7.90893775, "N*m"),
      stallCurrent: Qty(24, "A"),
      freeCurrent: Qty(5, "A"),
      weight: Qty(1.1, "lb"),
      url: "https://www.andymark.com/products/snow-blower-motor-with-hex-shaft",
    },
    {
      name: "775 RedLine",
      freeSpeed: Qty(21020, "rpm"),
      stallTorque: Qty(0.7, "N*m"),
      stallCurrent: Qty(130, "A"),
      freeCurrent: Qty(3.8, "A"),
      weight: Qty(0.806, "lb"),
      url: "https://www.andymark.com/products/andymark-775-redline-motor-v2",
    },
  ],
  "name"
);