loadPot();

async function loadPot() {

    const { data, error } =
        await db
            .from("entries")
            .select("*");

    if (error) {
        console.error(error);
        return;
    }

    let p1Penalty = 0;
    let p2Penalty = 0;

    let p1Questions = 0;
    let p2Questions = 0;

    data.forEach(entry => {

        if (entry.player === "P1") {

            p1Penalty += entry.penalty || 0;
            p1Questions += entry.questions || 0;

        }

        if (entry.player === "P2") {

            p2Penalty += entry.penalty || 0;
            p2Questions += entry.questions || 0;

        }

    });

    document.getElementById("p1Penalty")
        .textContent = p1Penalty;

    document.getElementById("p2Penalty")
        .textContent = p2Penalty;

    document.getElementById("p1Questions")
        .textContent = p1Questions;

    document.getElementById("p2Questions")
        .textContent = p2Questions;

    document.getElementById("totalPot")
        .textContent = p1Penalty + p2Penalty;
}

async function clearPot() {

    const confirmReset =
        confirm("Reset all penalties to zero?");

    if (!confirmReset) return;

    const { error } =
        await db
            .from("entries")
            .update({
                penalty: 0
            })
            .neq("id", 0);

    if (error) {
        alert("Reset failed");
        console.error(error);
        return;
    }

    alert("Pot cleared");

    loadPot();
}