Hooks.once("init", () => {
    game.settings.register("dsa5-elevation-ruler-integration", "walk", {
        name: game.i18n.localize("elevationRuler.TDE5.walk"),
        scope: "client",
        config: true,
        type: new foundry.data.fields.ColorField(),
        default: "#00FF00",
        onChange: (value) => { refreshSpeedCategories(); }
    });

    game.settings.register("dsa5-elevation-ruler-integration", "dash", {
        name: game.i18n.localize("elevationRuler.TDE5.dash"),
        scope: "client",
        config: true,
        type: new foundry.data.fields.ColorField(),
        default: "#3B4FE8",
        onChange: (value) => { refreshSpeedCategories(); }
    });

    game.settings.register("dsa5-elevation-ruler-integration", "unreachable", {
        name: game.i18n.localize("elevationRuler.TDE5.unreachable"),
        scope: "client",
        config: true,
        type: new foundry.data.fields.ColorField(),
        default: "#FF0000",
        onChange: (value) => { refreshSpeedCategories(); }
    });

});

Hooks.once("ready", () => {
    refreshSpeedCategories();

    CONFIG.elevationruler.SPEED.tokenSpeed = function (token) {
        const baseSpeed = token.actor.system.status.speed.max;
        if (baseSpeed === null) return null;
        return Number(baseSpeed);
    };

    CONFIG.elevationruler.SPEED.maximumCategoryDistance = function (token, speedCategory, tokenSpeed) {
        switch (speedCategory.name) {
            case "walk":
                return speedCategory.multiplier * tokenSpeed;
            case "dash":
                return speedCategory.multiplier * tokenSpeed;
        }
        return Number.POSITIVE_INFINITY;
    };
});

function refreshSpeedCategories() {
    let walkAction = {
        name: "walk",
        color: Color.from(game.settings.get("dsa5-elevation-ruler-integration", "walk")),
        multiplier: 1
    }

    let dashAction = {
        name: "dash",
        color: Color.from(game.settings.get("dsa5-elevation-ruler-integration", "dash")),
        multiplier: 2
    }

    let Unreachable = {
        name: "Unreachable",
        color: Color.from(game.settings.get("dsa5-elevation-ruler-integration", "unreachable")),
        multiplier: Number.POSITIVE_INFINITY
    }

    CONFIG.elevationruler.SPEED.CATEGORIES = [walkAction, dashAction, Unreachable];
}