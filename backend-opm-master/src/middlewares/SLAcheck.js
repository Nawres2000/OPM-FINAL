const WorkOrder = require('../models/workOrderModel');
const FollowUp = require('../models/followUpModel');

const checkSLA = async (id) => {
  try {
    // Get work order
    const workOrder = await WorkOrder.findById(id);
    if (workOrder.status === "Waiting" || workOrder.status === "In progress")
    {
      const followUp = FollowUp({
        title:workOrder.title, 
        description: workOrder.description, 
        status: workOrder.status,
        signedBy: workOrder.signedBy,
        clientId: workOrder.clientId,
        employeeId: workOrder.employeeId,
        listOfFiles: workOrder.listOfFiles,
        ticketList: workOrder.ticketList,
        creationDate: workOrder.creationDate,
        finishDate: workOrder.finishDate,
        partNum: workOrder.partNum,
        partName: workOrder.partName,
        serialNum: workOrder.serialNum      
      });
      followUp.title += " - 1"
      workOrder.followUpList.push(followUp);
      workOrder.isFollowUp = true;
      workOrder.status = 'Expired';
      await followUp.save();
      await workOrder.save();
    }
  } catch (error) {
    console.error('Error occurred while checking SLA:', error);
  }
};

module.exports = checkSLA;