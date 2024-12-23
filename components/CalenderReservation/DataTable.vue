<template>
  <section class="card">
    <HeaderCalender :statistics="statistics" />
    <h1>Testing</h1>
    <!-- FullCalendar -->
    <FullCalendar :options="calendarOptions" @select="handleSelect">
      <template v-slot:eventContent="arg">
        <b>{{ arg.event.title }}</b>
      </template>
    </FullCalendar>

  </section>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import HeaderCalender from "./HeaderCalender.vue";

export default {
  components: {
    FullCalendar,
    HeaderCalender,
  },
  data ()
  {
    return {
      selectedDates: [], // Array to store selected dates



      calendarOptions: {

        plugins: [resourceTimelinePlugin, interactionPlugin],
        initialView: "resourceTimeline",
        duration: { days: 20 },
        // weekends: true,
        resources: this.createResources(),
        selectable: true, // Enable date selection
        // eventOverlap: false, // Disallow overlapping events

        slotDuration: "24:00", // Slot duration of one day


        slotLabelContent: (arg) =>
        {
          const date = new Date(arg.date);
          const units = 50; // Example static units (can be dynamically set)
          const price = "$200"; // Example static price (can be dynamically set)

          // For level 0 (Months), show only the month
          if (arg.level === 0) {
            const month = date.toLocaleDateString("en-US", { month: "short" });
            return {
              html: `
              <div class="custom-slot-label">
                <div class="slot-month">${month}</div>
              </div>
            `,
            };
          }

          // For level 1 (Days), show only the day and weekday
          if (arg.level === 1) {
            const day = date.toLocaleDateString("en-US", { day: "2-digit" });
            const weekday = date.toLocaleDateString("en-US", {
              weekday: "short",
            });
            return {
              html: `
              <div class="custom-slot-label">
                <div class="slot-day">${day}</div>
                <div class="slot-weekday">${weekday}</div>
              </div>
            `,
            };
          }

          return null; // For other levels, return null (if any)
        },


        resourceGroupField: "groupId",
        resourceAreaHeaderContent: this.customResourceHeader, // Customize header
        resourceLaneContent: (arg) =>
        {
          const resource = arg.resource;
          const numOfCells = 20; // Number of cells (td) you want in each row

          // Create a string for the td elements inside the tr
          let tdCells = '';
          for (let i = 1; i <= numOfCells; i++) {
            tdCells += `<td class="fc-timeline-slot">${resource.title} - Cell ${i}</td>`;
          }

          // Return the customized row with 20 td elements
          return {
            html: `
      <tr class="custom-row">
        <h1>${resource.title}</h1>
        ${tdCells} <!-- Here 20 td elements are injected dynamically -->
      </tr>
    `,
          };
        },





        resourceAreaHeaderContent: () =>
        {
          // Custom header for resources (optional)
          return {
            html: `<div class="resource-header">Room/Subroom</div>`,
          };
        },
        // dateClick: this.handleDateClick,
        // select: this.handleSelect,
        events: [], // Store events programmatically
        footerToolbar: {
          left: "",
          center: "",
          right: "",
        },
      },
    };
  },
  methods: {




    createResources: function ()
    {
      const roomData = [
        { id: "a", title: "Room A", subrooms: ["A1", "A2", "A3"] },
        { id: "b", title: "Room B", subrooms: ["B1", "B2", "B3"] },
        { id: "c", title: "Room B", subrooms: ["c1", "c2", "c3"] },
        { id: "d", title: "Room B", subrooms: ["d1", "d2", "d3"] },
        { id: "e", title: "Room B", subrooms: ["e1", "e2", "e3"] },
        { id: "f", title: "Room B", subrooms: ["f1", "f2", "f3"] },
        { id: "g", title: "Room B", subrooms: ["g1", "g2", "g3"] },

      ];

      const resources = [];

      // Loop through roomData and create resources for each room and its subrooms
      roomData.forEach((room) =>
      {
        // Add main room as a resource
        resources.push({
          id: room.id,
          title: room.title,
          groupId: room.id,
          classNames: ["resource"], // Add class for styling
        });

        // Loop through subrooms and add them as resources
        room.subrooms.forEach((subroom) =>
        {
          resources.push({
            id: `${room.id}-${subroom}`,
            title: subroom,
            resourceId: room.id,
            groupId: room.id,
            classNames: ["subroom"], // Add class for subroom cells
          });
        });
      });

      return resources;
    },


    /**
     * Generates a custom resource header to display a dropdown to select a room (and its subrooms).
     * The dropdown shows a "Select All" option when nothing is selected.
     * When a room is selected, the subrooms under that room are also selected.
     * The dropdown text is updated based on the selected options.
     * The resource header also includes a toggle icon to collapse/expand all resources.
     * @returns {Object} - An object containing the custom resource header DOM nodes.
     */
    customResourceHeader ()
    {
      const roomData = this.createResources(); // Assuming createResources() returns room data with subrooms

      let htmlContent = `
    <div class="resource-header" style="position: relative;">
      <div class="btn-group" style="width: 100%;">
        <button class="btn btn-primary dropdown-toggle waves-effect waves-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Select Room
        </button>
        <ul class="dropdown-menu" style="width: 100%;">
          <li>
            <a class="dropdown-item" href="javascript:void(0);" onclick="this.selectAll()">Select All</a>
          </li>
  `;

      // Add room and subroom options with checkboxes
      roomData.forEach((resource) =>
      {
        //            htmlContent += `
        //       </ul>
        //     </div>
        //     <i class="fa-solid ${this.isExpanded ? "fa-minus" : "fa-plus"
        //       }" style="cursor: pointer; margin-left: 8px;" onclick="this.toggleResourceExpand();"></i>
        //   </div>

        //   <!-- Table to display filtered data -->
        //   <table class="table table-bordered mt-3" id="resourceTable">
        //     <thead>
        //       <tr>
        //         <th>Room</th>
        //         <th>Subroom</th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       <!-- Dynamic rows will go here -->
        //     </tbody>
        //   </table>
        // `
        htmlContent += `
      <li>
        <div class="form-check" style="padding:10px 40px"">
            <input type="checkbox" class="form-check-input" id="bs-validation-checkbox"  data-id="${resource.id}" onchange="this.filterData()">
            <label class="form-check-label" for="bs-validation-checkbox">   Room: ${resource.title}</label>
            <div class="invalid-feedback">You must agree before submitting.</div>
        </div>

      </li>
    `;

        if (resource.subrooms && Array.isArray(resource.subrooms)) {
          resource.subrooms.forEach((subroom) =>
          {
            htmlContent += `
          <li>
            <label class="dropdown-item">
              <input type="checkbox" class="subroom-checkbox" data-id="${subroom.id}" data-room-id="${resource.id}" onchange="this.filterData()">
              Subroom: ${subroom.title}
            </label>
          </li>
        `;
          });
        }
      });

      // Convert the HTML string to a DOM node
      const div = document.createElement("div");
      div.innerHTML = htmlContent.trim(); // Use trim() to remove unnecessary whitespace

      // Return the DOM node
      return { domNodes: [div.firstElementChild] };
    },




  },


};
</script>

<style></style>
