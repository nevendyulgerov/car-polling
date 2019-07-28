<template>
  <div data-view="beers">
    <!--
    <AddBeerDialog
      :is-on="isAddBeerModalOn"
      :is-loading="isAddingBeer"
      :on-cancel="toggleNewBeerModal"
      :on-confirm="createBeer"
    />

    <EditBeerDialog
      :beer="selectedBeer"
      :is-on="isEditBeerModalOn"
      :is-loading="isEditingBeer"
      :on-cancel="toggleEditBeerModal"
      :on-confirm="updateBeer"
    />
    -->

    <layout-logged-frame>
      <template slot="aside">
        <BeerFilters
          @filter="onFilter"
          @clearFilters="onClearFilters"
        />
      </template>
      <template slot="content">
        <base-table
          :columns="columns"
          :items="beers"
          :pages="totalPages"
          :pagination="pagination"
          :can-edit-columns="false"
          :has-custom-items-template="true"
          :is-loading="isLoading"
          :on-select-item="selectBeer"
          :on-update-pagination="updatePagination"
        >
          <template slot="title">
            <h1>{{ 'All' }}</h1>
            <span class="heading-separator">
              {{ ' / ' }}
            </span>
            <h2>{{ `${totalCount} beer${totalCount > 1 ? 's' : ''}` }}</h2>
          </template>

          <template
            slot="item-cell"
            slot-scope="scope"
          >
            <div v-if="scope.cell.column.value === 'picture'">
              <v-img
                :src="scope.cell.item.picture"
                class="elevation-2"
              />
            </div>
            <div v-else>
              {{ displayColumnValue(scope.cell.item, scope.cell.column.value) }}
            </div>
          </template>

          <template slot="actions">
            <v-btn
              class="trigger add-new-item elevation-4"
              color="secondary"
              @click="toggleNewBeerModal"
            >
              <v-icon>
                local_drink
              </v-icon>
              {{ 'Add new beer' }}
            </v-btn>
          </template>
        </base-table>
      </template>
    </layout-logged-frame>
  </div>
</template>

<script>
  import BeerFilters from '../../components/forms/filters/Beers';
  import AddBeerDialog from '../../components/dialogs/beers/AddDialog';
  import EditBeerDialog from '../../components/dialogs/beers/EditDialog';
  import { extractNestedProp, isStr } from '../../utils';
  import columns from '../../config/beers/columns';

  export default {
    components: {
      AddBeerDialog,
      EditBeerDialog,
      BeerFilters
    },
    data() {
      return {
        columns,
        pagination: {
          descending: true,
          page: 1,
          rowsPerPage: 15,
          sortBy: 'name',
          totalItems: 0,
          search: ''
        },
        selectedBeer: {},
        totalPages: 0,
        query: {},
        isEditBeerModalOn: false,
        isEditingBeer: false,
        isAddBeerModalOn: false,
        isAddingBeer: false,
        isLoading: false
      };
    },
    computed: {
      beers() {
        return this.$store.getters['beers/items'];
      },
      totalCount() {
        return this.beers.length;
      }
    },
    created() {
      const { query, pagination } = this;
      const { sortBy } = pagination;

      this.getBeers({
        ...query,
        sort: sortBy
      });
    },
    methods: {
      getBeers({ page = 1, perPage = 15, order = 'asc', sort = '', search = '', brewery = '', country = '', abv = 0, style = '' } = {}) {
        const query = {
          page,
          perPage,
          order,
          sort,
          search,
          brewery,
          country,
          abv,
          style
        };

        this.isLoading = true;
        this.pagination.descending = order === 'desc';

        if (sort !== '') {
          this.pagination.sortBy = sort;
        }

        return this.$store.dispatch('beers/getBeers', query)
          .then((res) => {
            this.isLoading = false;
            return res;
          })
          .catch((err) => {
            this.isLoading = false;
            return err;
          });
      },
      selectBeer(beer) {
        this.selectedBeer = beer;
        this.toggleEditBeerModal();
      },
      displayColumnValue(item, columnValue) {
        return extractNestedProp(item, columnValue);
      },
      toggleEditBeerModal() {
        this.isEditBeerModalOn = !this.isEditBeerModalOn;
      },
      toggleNewBeerModal() {
        this.isAddBeerModalOn = !this.isAddBeerModalOn;
      },
      createBeer(beer) {
        this.isAddingBeer = true;
        return this.$store.dispatch('beers/createBeer', beer)
          .then((res) => {
            this.isAddingBeer = false;
            this.toggleNewBeerModal();
            return res;
          })
          .catch((err) => {
            this.isAddingBeer = false;
            return err;
          });
      },
      updateBeer(beer) {
        const query = {
          id: this.selectedBeer.id,
          ...beer
        };
        this.isEditingBeer = true;
        return this.$store.dispatch('beers/updateBeer', query)
          .then((res) => {
            this.isEditingBeer = false;
            this.toggleEditBeerModal();
            return res;
          })
          .catch((err) => {
            this.isEditingBeer = false;
            return err;
          });
      },
      onFilter(filters) {
        this.query = {
          ...this.query,
          ...this.getSearchQuery(filters)
        };

        this.getBeers(this.query);
      },
      onClearFilters() {
        const { sortBy } = this.pagination;
        this.query = { sort: sortBy };

        this.getBeers(this.query);
      },
      getSearchQuery({ search, brewery, country, abv, style }) {
        const query = {};

        if (search !== '') {
          query.search = search;
        }

        if (brewery !== '') {
          query.brewery = brewery;
        }

        if (country !== '') {
          query.country = country;
        }

        if (abv > 0) {
          query.abv = abv;
        }

        if (style !== '') {
          query.style = style;
        }

        return query;
      },
      updatePagination({ page, descending, sortBy }) {
        const { query, pagination } = this;
        const nextQuery = {
          ...query,
          page,
          order: descending ? 'desc' : 'asc',
          sort: isStr(sortBy) ? sortBy : pagination.sortBy
        };

        this.query = nextQuery;

        this.getBeers(nextQuery);
      },
    },
    metaInfo() {
      return {
        title: 'Beers'
      };
    }
  };
</script>

<style lang="stylus">
  [data-view="beers"] {
    .view-wrapper {
      padding: 32px 0 0 0;
    }

    [data-component="table"] {
      .v-image {
        width: 80px;
        height: 80px;
        border-radius: 2px;

        .v-image__image.v-image__image--cover {
          background-size: contain;
        }
      }
    }
  }
</style>
