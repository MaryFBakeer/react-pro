import { SaveForm } from '~shared/ui/SaveForm';

const simulateSave = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

export const FormWithSave = () => {
  return <SaveForm onSave={simulateSave} />;
};
