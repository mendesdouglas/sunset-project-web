'use client';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useClients  } from '../../../hooks/useClients';

type FormValues = {
  name: string;
  email: string;
  phone: string;
  cep: string;
  state: string;
  city: string;
};

const validationSchema = Yup.object({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  phone: Yup.string().required('Telefone é obrigatório'),
  cep: Yup.string().required('CEP é obrigatório'),
  state: Yup.string().required('Estado é obrigatório'),
  city: Yup.string().required('Cidade é obrigatório'),
});
export default function Register() {
  const router = useRouter();
  const { addClient } = useClients();
  
  
  const initialValues: FormValues = {
    name: '',
    email: '',
    phone: '',
    cep: '',
    state: '',
    city: '',
  };

  const onSubmit = async (values: FormValues) => {
    try {
      await addClient(values);
      router.push('/clientes');
    } catch (error) {
      console.error('Erro ao registrar cliente:', error);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-black-100">
      <div className="bg-black p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center">Registrar Cliente</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <label className="block mb-1">Nome</label>
                <Field
                  name="name"
                  className="w-full p-2 border border-gray-300 text-black rounded"
                  placeholder="Nome"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="w-full p-2 border border-gray-300 text-black rounded"
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Telefone</label>
                <Field
                  name="phone"
                  mask="(99) 99999-9999"
                  className="w-full p-2 border border-gray-300 text-black rounded"
                  placeholder="Telefone"
                  onChange={(e:any) => setFieldValue('phone', e.target.value)}
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label className="block mb-1">CEP</label>
                <Field
                  name="cep"
                  className="w-full p-2 border border-gray-300 text-black rounded"
                  placeholder="CEP"
                />
                <ErrorMessage name="cep" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Estado</label>
                <Field
                  name="state"
                  className="w-full p-2 border border-gray-300 text-black rounded"
                  placeholder="Estado"
                />
                <ErrorMessage name="state" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-6">
                <label className="block mb-1">Cidade</label>
                <Field
                  name="city"
                  className="w-full p-2 border border-gray-300 text-black rounded"
                  placeholder="Cidade"
                />
                <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => router.push('/clientes')}
                  className=" bg-gray-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className=" bg-black-500 text-white p-2 rounded hover:bg-black-600 transition duration-200"
                >
                  Registrar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

