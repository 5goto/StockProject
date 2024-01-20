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
        <label htmlFor="name">Название продукта</label>
        <input
          id="name"
          {...register('product.product_name', { required: true })}
        />

        <div className={styles.dates}>
          <div>
            <label htmlFor="receipt_date">Дата приема</label>
            <input
              id="receipt_date"
              type="date"
              placeholder="Дата приема"
              {...register('receipt_date', { required: true })}
            />
          </div>
          <div>
            <label style={{ textAlign: 'right' }} htmlFor="date_of_write_off">
              Дата списания
            </label>
            <input
              id="date_of_write_off"
              type="date"
              placeholder="Дата списания"
              {...register('date_of_write_off', { required: true })}
            />
          </div>
        </div>

        <div className={styles.dates}>
          <div>
            <label htmlFor="conditions">Условия хранения</label>
            <select
              id="conditions"
              {...register('product.conditions.conditions_type', {
                required: true,
              })}>
              <option value={ConditionsType.Flammable}>Огнеопасный</option>
              <option value={ConditionsType.Fragile}>Хрупкий</option>
              <option value={ConditionsType.Frozen}>Замороженный</option>
            </select>
          </div>
          <div>
            <label style={{ textAlign: 'right' }} htmlFor="capacity">
              Объём
            </label>
            <input
              id="capacity"
              type="number"
              {...register('init_capacity', { required: true })}
            />
          </div>
        </div>
        <div>
          <label htmlFor="compartment">Выбор отсека</label>
          <select
            id="compartment"
            {...register('compartment.id', { required: true })}>
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
                    {item.totalCapacity} / {item.capacity}
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
