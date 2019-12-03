import { PropType, PropOptions } from "@vue/composition-api";

/** helps with typing props
 *  e.g.
    export default createComponent({
      props: {
        person: prop<Person>(Object, { required: true }),
      }
    });
 */
export function prop<T>(
  type: PropType<T>,
  options: PropOptions<T, boolean> = { required: false }
): PropOptions<T, boolean> {
  return { type, ...options };
}

/**
 * props need a factoryFunction for default objects...
 *
 * e.g.:
    export default createComponent({
      props: {
        person: prop<Person>(Object, { required: false, default: createDefault<Person>({id:0, name:"default"}) }),
      }
    });
 *
 * @param o defaultObject to be casted to T
 */
export const createDefault = <T>(o: any): T => <T>o;

/**
 * In setup(props) the props.properties are of <T|undefined>, so we need a helper
 * to safely cast it and gives back just T without undefined
 * @param type to be casted
 * @param defaultObject use this if type is undefined
 */
/*
interface IConstructor<T> {
  // enforce default constructor
  new (): T;
}
 function NewType<T>(newtype: IConstructor<T>): T {
  const Newtype = newtype;
  return new Newtype();
} */
export const safeCast = <T>(type: any, defaultObject?: T): T => {
  // type is defined, all is A ok
  if (typeof type !== "undefined") return <T>type;
  // at least we have a default
  // const crappyDefault = () => {
  //   return {};
  // };
  return <T>defaultObject; // ?? crappyDefault();
  /*   else if (defaultObject) return <T>defaultObject;
  // try to cast with just new()
  else {
    // const TCreator: { new (...args: any[]): T } = { new(...args: any[]): T; };
    // return new NewType();
    // return NewType<T>({});
  } */
};
