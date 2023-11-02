type PersonProps = {
  name: {
    first: string;
    last: string;
  };
};

export const PersonName = (props: PersonProps) => {
  return (
    <div>
      <h2>
        {props.name.first}
        {props.name.last}
      </h2>
    </div>
  );
};
