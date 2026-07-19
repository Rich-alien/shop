import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import {
  DEFAULT_STATUS,
  loadingStatus,
  Product,
  ProductDto,
  ProductService,
  StoreBaseState,
} from '@shared/data-access';
import {
  addEntity,
  removeEntity,
  SelectEntityId,
  setAllEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, filter, Observable, pipe, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';

const selectId: SelectEntityId<Product> = (ns): string => ns.uuid;

interface ProductState extends StoreBaseState {}

export const ProductStore = signalStore(
  withEntities<Product>(),
  withProps((_, productService = inject(ProductService)) => {
    return {
      _productService: productService,
    };
  }),
  withState<ProductState>({ status: DEFAULT_STATUS, error: null }),
  withMethods((store) => {
    const init = rxMethod<void>(
      pipe(
        filter(() => store.status() !== loadingStatus['IDLE']),
        switchMap(() => loadProducts()),
      ),
    );
    const reInit = rxMethod<void>(pipe(switchMap(() => loadProducts())));
    const createProduct = rxMethod<ProductDto>(
      pipe(
        switchMap((product) => store._productService.createProduct(product)),
        tap((product) => patchState(store, addEntity(product, { selectId }))),
        filter(() => !!store.entities().length),
        tap(() =>
          patchState(store, {
            status: loadingStatus['LOADED'],
          }),
        ),
      ),
    );

    const removeProduct = rxMethod<string>(
      pipe(
        switchMap((id) => store._productService.removeProduct(id)),
        tap((product) => patchState(store, removeEntity(product.uuid))),
        filter(() => !store.entities().length),
        tap(() =>
          patchState(store, {
            status: loadingStatus['EMPTY'],
          }),
        ),
      ),
    );

    function loadProducts(): Observable<Product[]> {
      patchState(store, {
        status: loadingStatus['LOADING'],
        error: null,
      });

      return store._productService.getAllProduct().pipe(
        tap((products) =>
          patchState(
            store,
            { status: products.length ? loadingStatus['LOADED'] : loadingStatus['EMPTY'] },
            setAllEntities(products, { selectId }),
          ),
        ),
        catchError((error) => {
          patchState(store, {
            status: loadingStatus['ERROR'],
            error,
          });
          return [];
        }),
      );
    }

    return {
      init,
      reInit,
      createProduct,
      removeProduct,
    };
  }),
  withHooks((store) => {
    return {
      onInit: () => store.init(),
    };
  }),
);
export type ProductStore = InstanceType<typeof ProductStore>;
