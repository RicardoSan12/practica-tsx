// Se creara una unión de tipos de todos estos tipos. Para usarlo para definir un tipo array, que debería aceptar cualquiera de estos tipos aunque cada interface tenga diferentes tipos
interface CoursePartOne {
  name: 'Fundamentals';
  exerciseCount: number;
  description: string;
}

interface CoursePartTwo {
  name: 'Using props to pass data';
  exerciseCount: number;
  groupProjectCount: number;
}

interface CoursePartThree {
  name: 'Deeper type usage';
  exerciseCount: number;
  description: string;
  exerciseSubmissionLink: string;
}
// type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;

// Identificando los atributos que todas las partes del tienen en común y se creara un tipo base que los contiene. Luego, extenderemos ese tipo base para crear nuestros tipos específicos
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CoursePartBase {
  name: 'Fundamentals';
  description: string;
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase {
  name: 'Deeper type usage';
  description: string;
  exerciseSubmissionLink: string;
}
type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;
enum CoursePartTotal2 {
  CoursePartOne,
  CoursePartTwo,
  CoursePartThree,
}

const CoursePartTotal = [
  {
    name: 'Fundamentals',
    description: 'Iniciamos con la description',
  },
  {
    name: 'Fundamentals',
    description: 'Resumen de que cabamos de ver',
  },
];

//Función de ayuda para la comprobación exhaustiva de tipos, Su principio básico es que si encontramos un valor inesperado, llamamos a una función que acepta un valor con el tipo never y también tiene el tipo de retorno never.
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}; // Investigar mas ------------

CoursePartTotal.forEach((part): CoursePart => {
  switch (part.name) {
    case 'Fundamentals':
      console.log(`Esta es la description ${part.description}`);
      break;
    case 'Using props to pass data':
      console.log(`Esta es la description ${part.description}`);
      break;
    case 'Deeper type usage':
      console.log(`Esta es la description ${part.description}`);
      break;
    default:
      return assertNever(part);
  }
});

// ----------------------- INVESTIGAR MAP<>
// interface Patient {
//   id: string | number;
//   name: string
//   description: string;
//   date: string;
//   specialist: string;
//   diagnosisCodes?: string[];
// }

// El estado es un objeto con una key patients,
// El índice solo puede ser un string o un number esto hace que el estado evita que los desarrolladores hagan un mal uso del estado.

// TypeScript en realidad no tiene ninguna forma de saber si la key a la que está intentando acceder realmente existe o no. Si intetas acceder a un paciente con identificación no existente, el compilador pensaría que el valor devuelto es de tipo Patient y no se produciría ningún:

export type State = {
  patients: { [id: string]: Patient | undefined };
};

// Una forma más estricta de tipos sería usar objetos Map, a los que puede declarar un tipo tanto para la key como para el contenido. La función de acceso de map get() siempre devuelve una unión del tipo de valor declarado e indefinido.

interface StateMejorado {
  patients: Map<string, Patient>;
}

const myPatient = state.patients.get('non-existing-id');
console.log(myPatient.name); // error, Object is possibly 'undefined'

// ------------------------- INVESTIGAR MAP<>

// La manipulación de estados se realiza mediante un reducer. Se define en el archivo reducer.ts junto con el tipo Action
interface Patient {
  id: string | number;
  name: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
}

export type Actionn =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    };
// Cambia el estado para cada tipo de acción:
export const reducer = (state: State, action: Actionn): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};
// archivo state.ts, que se encarga de configurar el contexto. El hook useReducer se esta utilizado para crear el estado y la función de envío, y pasarlos al context provider:
import { useReducer } from 'react';
import React = require('react');

const StateContext = React.createContext([]);

export const StateProvider = ({ reducer, children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
// El proveedor hace que las funciones de state y dispatch estén disponibles en todos los componentes, con configuración en index.ts no cambia la configuracion del provider con TypeScript:
const App = (
  <StateProvider reducer={reducer}>
    <App />
  </StateProvider>
);

// ---------------------------------

// el componente requiere dos props: onSubmit y onCancel. Ambas son funciones callback que devuelven void. La función onSubmit debería recibir un objeto de tipo PatientFormValues como argumento, de modo que la devolución de llamada pueda manejar nuestros valores de formulario.
type PatientFormValues = Omit<Patient, 'id' | 'entries'>;

const handleSummit = (evt: React.FormEvent<HTMLFormElement>) => {
  evt.preventDefault();
  onNewSub((sub) => [...sub, inputValues]);
};

interface Props {
  onSubmit: (values: PatientFormValues) => void; // Solo se pasa el nuevo del valor state
  onNewSub: React.Dispatch<React.SetStateAction<subscriptor[]>>; // pasas el modificador setSub para cambiar el state en el mismo componente

  onCancel: () => void; // solo se ejecuta
}

// Creando dos ejemplos de como definir Action de un reducer

// Esta version muy comun
export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    };

// Version mas detallada:
interface TypeOne {
  type: 'SET_PATIENT_LIST';
  payload: Patient[];
}
interface TypeSecond {
  type: 'ADD_PATIENT';
  payload: Patient;
}

type ActionFormDiferent = TypeOne | TypeSecond;
