import { useEffect } from "react";

type Greet1Props = {
  email: string;
  age: number;
};

export type GreetProps = {
  name: string;
} & Greet1Props;

interface Person {
  name?: string;
  email: string;
  sex?: string;
}

export interface Address {
  doorNumber: number;
  street?: string;
}

export interface PersonDetail extends Person, Address {}

export const Greet = (props: GreetProps) => {
  useEffect(() => {
    printConsole({
      test: "fksjdfkj",
    });
    printConsole("fldsjnf");
    printConsole(12);
    printConsole(true);
    var array = new Array();
    array.push(1);
    array.push(2);
    array.push(3);
    printConsole(array);
    printConsole(["A", "B"]);
    staticFunction(6);
  }, []);

  function printConsole<T>(arg: T): void {
    console.log(typeof arg);
  }

  function staticFunction(age: number) {
    var totalAge = age + 18;
    console.log(totalAge);
  }

  return (
    <div>
      <h2> hi {props.email}</h2>
    </div>
  );
};
