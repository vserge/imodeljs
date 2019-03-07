/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { HubIModel, AccessToken, IModelQuery, Version, VersionQuery } from "@bentley/imodeljs-clients";
import { ActivityLoggingContext, Guid, OpenMode } from "@bentley/bentleyjs-core";
import { IModelConnection, IModelApp } from "@bentley/imodeljs-frontend";
import { IModelVersion } from "@bentley/imodeljs-common";

export class IModelApi {

  /** Get all iModels in a project */
  public static async getIModelByName(accessToken: AccessToken, projectId: string, iModelName: string): Promise<HubIModel | undefined> {
    const alctx = new ActivityLoggingContext(Guid.createValue());
    const queryOptions = new IModelQuery();
    queryOptions.select("*").top(100).skip(0);
    const iModels: HubIModel[] = await IModelApp.iModelClient.iModels.get(alctx, accessToken, projectId, queryOptions);
    if (iModels.length < 1)
      return undefined;
    for (const thisIModel of iModels) {
      if (!!thisIModel.id && thisIModel.name === iModelName) {
        const versions: Version[] = await IModelApp.iModelClient.versions.get(alctx, accessToken, thisIModel.id!, new VersionQuery().select("Name,ChangeSetId").top(1));
        if (versions.length > 0) {
          thisIModel.latestVersionName = versions[0].name;
          thisIModel.latestVersionChangeSetId = versions[0].changeSetId;
        }
        return thisIModel;
      }
    }
    return undefined;
  }

  /** Open the specified version of the IModel */
  public static async openIModel(accessToken: AccessToken, projectId: string, iModelId: string, changeSetId: string | undefined, openMode: OpenMode): Promise<IModelConnection> {
    return IModelConnection.open(accessToken!, projectId, iModelId, openMode, changeSetId ? IModelVersion.asOfChangeSet(changeSetId) : IModelVersion.latest());
  }
}
