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
  ProductSocketService,
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
import { catchError, EMPTY, filter, Observable, pipe, switchMap, tap } from 'rxjs';
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const selectId: SelectEntityId<Product> = (ns): string => ns.uuid;

interface ProductState extends StoreBaseState {}

export const ProductStore = signalStore(
  withEntities<Product>(),
  withProps(
    (
      _,
      productService = inject(ProductService),
      productSocketService = inject(ProductSocketService),
      destroyRef = inject(DestroyRef),
    ) => {
      return {
        _productService: productService,
        _productSocketService: productSocketService,
        _destroyRef: destroyRef,
      };
    },
  ),
  withState<ProductState>({ status: DEFAULT_STATUS, error: null }),
  withMethods((store) => {
    const init = rxMethod<void>(
      pipe(
        filter(() => store.status() !== DEFAULT_STATUS),
        switchMap(() => loadProducts()),
      ),
    );
    const reInit = rxMethod<void>(pipe(switchMap(() => loadProducts())));
    const createProduct = rxMethod<ProductDto>(
      pipe(switchMap((product) => store._productService.createProduct(product))),
    );
    const removeProduct = rxMethod<string>(
      pipe(switchMap((id) => store._productService.removeProduct(id))),
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
          return EMPTY;
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
      onInit: () => {
        store.init();
        store._productSocketService
          .onProductCreated()
          .pipe(
            tap((product: Product) =>
              patchState(
                store,
                { status: loadingStatus['LOADED'] },
                addEntity(product, { selectId }),
              ),
            ),
            takeUntilDestroyed(store._destroyRef),
          )
          .subscribe();

        /* store._productSocketService
          .onProductUpdated()
          .pipe(
            tap((product: ProductDto) => {
              console.log(product);
            }),
          )
          .subscribe();*/

        store._productSocketService
          .onProductDeleted()
          .pipe(
            tap((uuid) => patchState(store, removeEntity(uuid))),
            filter(() => !store.entities().length),
            tap(() =>
              patchState(store, {
                status: loadingStatus['EMPTY'],
              }),
            ),
            takeUntilDestroyed(store._destroyRef),
          )
          .subscribe();
      },
    };
  }),
);
export type ProductStore = InstanceType<typeof ProductStore>;
