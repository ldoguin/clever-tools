'use strict';

const client = require('@clevercloud/client/cjs/api/v4/networkgroup.js');

const prompts = require('prompts');

const { sendToApi } = require('../../models/send-to-api.js');
const { ngQuestions } = require('../../models/questions');

const Logger = require('../../logger.js');
const Networkgroup = require('../../models/networkgroup.js');
const Formatter = require('./format-string.js');
const TableFormatter = require('./format-table.js');

async function listNetworkgroups (params) {
  const { json } = params.options;
  const ownerId = await Networkgroup.getOwnerId();

  Logger.info(`Listing networkgroups from owner ${Formatter.formatString(ownerId)}`);
  const result = await client.get({ ownerId }).then(sendToApi);

  if (json) {
    Logger.println(JSON.stringify(result, null, 2));
  }
  else {
    if (result.length === 0) {
      Logger.println(`No networkgroup found. You can create one with ${Formatter.formatCommand('clever networkgroups create')}.`);
    }
    else {
      TableFormatter.printNetworkgroupsTableHeader();
      const resultToPrint = result.map((ng) => TableFormatter.formatNetworkgroupsLine(ng));
      for (const ng of resultToPrint) {
        Logger.println(ng);
      }
    }
  }
}

async function createNg (params) {
  let { label, description, tags, interactive, json } = params.options;
  const ownerId = await Networkgroup.getOwnerId();

  // Ask for missing data if interactive
  if (interactive) {
    const questions = [];
    if (!tags) questions.push(ngQuestions.ngTags);
    if (questions.length > 0) {
      // Do not abort prompt loop on cancel
      const onCancel = () => true;
      const test1 = await prompts(questions, { onCancel });
      tags = tags ?? test1.ngTags;
    }
  }

  Logger.info(`Creating networkgroup from owner ${Formatter.formatString(ownerId)}`);
  const body = { owner_id: ownerId, label, description, tags };
  Logger.debug('Sending body: ' + JSON.stringify(body, null, 2));
  const result = await client.createNg({ ownerId }, body).then(sendToApi);

  if (json) {
    Logger.println(JSON.stringify(result, null, 2));
  }
  else {
    Logger.println(`Networkgroup ${Formatter.formatString(label)} was created with the id ${Formatter.formatString(result.id)}.`);
  }
}

async function deleteNg (params) {
  const { ng: ngIdOrLabel } = params.options;
  const ownerId = await Networkgroup.getOwnerId();
  const ngId = await Networkgroup.getId(ownerId, ngIdOrLabel);

  Logger.info(`Deleting networkgroup ${Formatter.formatString(ngId)} from owner ${Formatter.formatString(ownerId)}`);
  await client.deleteNg({ ownerId, ngId }).then(sendToApi);

  Logger.println(`Networkgroup ${Formatter.formatString(ngId)} was successfully deleted.`);
}

module.exports = {
  listNetworkgroups,
  createNg,
  deleteNg,
};
