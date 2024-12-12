<template>
  <div class="card">
    <h5 class="card-header">Bordered Table</h5>
    <div class="card-body p-0">
      <div class="table-responsive text-nowrap">
        <table class="table">
          <div class="date-navigation">
            <button class="prev-days" @click="prev20Days">&lt; </button>
            <button class="next-days" @click="next20Days"> &gt;</button>
          </div>
          <thead>
            <tr>
              <th colspan="3" style="width: 300px;">
                <div class="demo-inline-spacing">
                  <div class="btn-group">
                    <button class="btn btn-primary dropdown-toggle waves-effect waves-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Dropdown
                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="javascript:void(0);">Action</a></li>
                      <li><a class="dropdown-item" href="javascript:void(0);">Another action</a></li>
                      <li><a class="dropdown-item" href="javascript:void(0);">Something else here</a></li>
                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      <li><a class="dropdown-item" href="javascript:void(0);">Separated link</a></li>
                    </ul>
                  </div>
                </div>
              </th>

              <th v-for="date in daysRange" :key="date">
                <div>
                  <div>{{ date.weekday }}</div>
                  <div>{{ date.dayMonth }}</div>
                </div>
              </th>
            </tr>
          </thead>

        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data ()
  {
    return {
      startDate: new Date(),
    };
  },
  computed: {
    daysRange ()
    {
      const range = [];
      for (let i = 0; i < 20; i++) {
        const currentDate = new Date(this.startDate.getTime() + i * 24 * 60 * 60 * 1000);
        range.push({
          weekday: this.formatWeekday(currentDate),
          dayMonth: this.formatDayMonth(currentDate),
        });
      }
      return range;
    },
  },
  methods: {
    formatWeekday (date)
    {
      const options = { weekday: 'short' };
      return date.toLocaleDateString(undefined, options);
    },
    formatDayMonth (date)
    {
      const options = { day: 'numeric', month: 'short' };
      return date.toLocaleDateString(undefined, options);
    },
    next20Days ()
    {
      this.startDate = new Date(this.startDate.getTime() + 20 * 24 * 60 * 60 * 1000);
    },
    prev20Days ()
    {
      this.startDate = new Date(this.startDate.getTime() - 20 * 24 * 60 * 60 * 1000);
    },
  },
};
</script>

<style>
.date-navigation button {
  width: 40px;
  height: 40px;
  background: red;
  border: 0;
  outline: 0;
  border-radius: 50%;
}

.next-days {
  position: absolute;
  top: 90px;
  right: -10px;
}

.prev-days {
  position: absolute;
  top: 90px;
  left: 130px;
}


.dates-container {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

th>div {
  text-align: center;
}

.table,
th,
td {
  border: 1px solid #5d596c;
  border-collapse: collapse;
}

.table-bordered> :not(caption)>*>* {
  border-width: 3px;
}
</style>
