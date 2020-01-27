"use strict";


const { ControlKind, InputEvent } = require('../../interactive/constants/MixplayConstants');
const effectModels = require("../models/effectModels");
const { EffectTrigger } = effectModels;

const customRolesManager = require("../../roles/custom-roles-manager");

/**
 * The Delay effect
 */
const delay = {
    /**
   * The definition of the Effect
   */
    definition: {
        id: "firebot:update-roles",
        name: "Update Viewer Roles",
        description: "Add or remove a viewer from custom roles",
        tags: ["Logic control", "Built in"],
        dependencies: [],
        triggers: effectModels.buildEffectTriggersObject(
            [ControlKind.BUTTON, ControlKind.TEXTBOX],
            [InputEvent.MOUSEDOWN, InputEvent.KEYDOWN, InputEvent.SUBMIT],
            EffectTrigger.ALL
        )
    },
    globalSettings: {},
    optionsTemplate: `

        <eos-container header="Viewer">
            <div style="padding: 0 10px 0 0;">
                <label class="control-fb control--radio">Associated viewer <tooltip text="'The viewer who pressed this button/ran the command/etc.'"></tooltip>
                    <input type="radio" ng-model="effect.viewerType" value="current"/> 
                    <div class="control__indicator"></div>
                </label>
                <label class="control-fb control--radio" style="margin-bottom: 10px;">Custom viewer
                    <input type="radio" ng-model="effect.viewerType" value="custom"/>
                    <div class="control__indicator"></div>
                </label>                
                <div ng-show="effect.viewerType === 'custom'" style="padding-left: 30px;">
                    <input class="form-control" type="text" ng-model="effect.customViewer" placeholder="Username" replace-variables></input> 
                </div>               
            </div>
        </eos-container>

        <eos-container header="Custom Role Actions" pad-top="true">
            <div>
                <label class="control-fb control--checkbox"> Add to role</tooltip>
                    <input type="checkbox" ng-init="shouldAddRole = (effect.addRoleId != null && effect.addRoleId !== '')" ng-model="shouldAddRole" ng-click="effect.addRoleId = undefined">
                    <div class="control__indicator"></div>
                </label>
                <div uib-collapse="!shouldAddRole" style="margin: 0 0 15px 15px;">
                    <div class="btn-group" uib-dropdown>
                        <button id="single-button" type="button" class="btn btn-default" uib-dropdown-toggle>
                        {{getRoleName(effect.addRoleId)}} <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" uib-dropdown-menu role="menu" aria-labelledby="single-button">
                            <li role="menuitem" ng-repeat="role in roles" ng-click="effect.addRoleId = role.id"><a href>{{role.name}}</a></li>
                        </ul>
                    </div>
                </div>         
            </div>
            
            <div style="margin-top:5px;">
                <label class="control-fb control--checkbox"> Remove from role</tooltip>
                    <input type="checkbox" ng-init="shouldRemoveRole = (effect.removeRoleId != null && effect.removeRoleId !== '')" ng-model="shouldRemoveRole" ng-click="effect.removeRoleId = undefined">
                    <div class="control__indicator"></div>
                </label>
                <div uib-collapse="!shouldRemoveRole" style="margin: 0 0 15px 15px;">
                    <div class="btn-group" uib-dropdown>
                        <button id="single-button" type="button" class="btn btn-default" uib-dropdown-toggle>
                        {{getRoleName(effect.removeRoleId)}} <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" uib-dropdown-menu role="menu" aria-labelledby="single-button">
                            <li role="menuitem" ng-repeat="role in roles" ng-click="effect.removeRoleId = role.id"><a href>{{role.name}}</a></li>
                        </ul>
                    </div>
                </div>         
            </div>
        </eos-container>
    `,
    /**
   * The controller for the front end Options
   */
    optionsController: ($scope, viewerRolesService) => {

        if ($scope.effect.viewerType == null) {
            $scope.effect.viewerType = "current";
        }

        $scope.roles = viewerRolesService.getCustomRoles();

        $scope.getRoleName = (roleId) => {
            let role = $scope.roles.find(r => r.id === roleId);
            return role ? role.name : "Select one";
        };
    },
    /**
   * When the effect is saved
   */
    optionsValidator: effect => {
        let errors = [];
        return errors;
    },
    /**
   * When the effect is triggered by something
   */
    onTriggerEvent: event => {
        return new Promise(resolve => {
            let effect = event.effect;

            let username = "";
            if (effect.viewerType === "current") {
                username = event.trigger.metadata.username;
            } else {
                username = effect.customViewer ? effect.customViewer.trim() : "";
            }

            if (effect.addRoleId) {
                customRolesManager.addViewerToRole(effect.addRoleId, username);
            }

            if (effect.removeFrom) {
                customRolesManager.removeViewerFromRole(effect.addRoleId, username);
            }

            resolve();
        });
    }
};

module.exports = delay;
