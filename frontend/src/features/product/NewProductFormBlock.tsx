import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './NewProductFormBlock.module.css';
import { ConditionsType } from '../compartment/CompartmentList';
import { CompartmentType, getAllCompartments } from '../../api/compartment';
import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import stock from '../../assets/stock.png';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../api/unit';

interface ConditionsField {
  conditions_type: ConditionsType;
}

interface ProductField {
  product_name: string;
  conditions: ConditionsField;
}

interface CompartmentField {
  id: string;
}

export type FormInputs = {
  product: ProductField;
  receipt_date: string;
  date_of_write_off: string;
  init_capacity: number;
  compartment: CompartmentField;
};

export const NewProductFormBlock = () => {
  const { register, handleSubmit, watch, reset } = useForm<FormInputs>();
  const navigate = useNavigate();

  const {
    data,
  }: UseQueryResult<Array<CompartmentType>, Error> = useQuery({
    queryKey: ['allCompartments'],
    queryFn: getAllCompartments,
  });

  const request = useMutation({
    mutationFn: createProduct,
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    request.mutate(data);
    reset();
  };

  const onCancelClickHandler = () => {
    navigate(-1);
  };

  return (
    <div className={styles.newProduct}>
      <div className={styles.prompt}>
        <img src={stock} alt="stock" />
        <h2>
          Добавление нового
          <br /> товара
        </h2>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Название продукта"
          {...register('product.product_name')}
        />

        <input
          type="date"
          placeholder="Дата приема"
          {...register('receipt_date', { required: true })}
        />
        <input
          type="date"
          placeholder="Дата списания"
          {...register('date_of_write_off', { required: true })}
        />

        <select {...register('product.conditions.conditions_type')}>
          <option value={ConditionsType.Flammable}>flammable</option>
          <option value={ConditionsType.Fragile}>fragile</option>
          <option value={ConditionsType.Frozen}>frozen</option>
        </select>

        <input
          type="number"
          placeholder="Объем"
          {...register('init_capacity', { required: true })}
        />

        <div>
          <select {...register('compartment.id')}>
            <option value={0}>Выбрать позже</option>
            {data &&
              watch('init_capacity') &&
              data
                .filter(
                  (item: CompartmentType) =>
                    item.capacity - item.totalCapacity >=
                      watch('init_capacity') &&
                    item.conditionType ==
                      watch('product.conditions.conditions_type')
                )
                ?.map((item: CompartmentType) => (
                  <option value={item.id} key={item.id}>
                    {JSON.stringify(item)}
                  </option>
                ))}
          </select>
        </div>

        <div className={styles.buttons}>
          <input type="submit" />
          <button onClick={onCancelClickHandler}>Назад</button>
        </div>
      </form>
      {request.isError && <h3 style={{ color: 'red' }}>Bad request</h3>}
      {request.isPending && <h3>Отправляем...</h3>}
      {request.isSuccess && (
        <h3 style={{ color: 'green' }}>Продукт успешно создан</h3>
      )}
    </div>
  );
};
