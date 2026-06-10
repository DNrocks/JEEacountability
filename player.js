const player = localStorage.getItem("selectedPlayer");

document.getElementById("playerName").textContent = player;

const today = new Date().toISOString().split("T")[0];

document.getElementById("todayDate").textContent =
    "Date: " + today;

loadToday();
loadHistory();

async function loadToday() {

    const { data, error } = await db
        .from("entries")
        .select("*")
        .eq("player", player)
        .eq("date", today)
        .maybeSingle();

    if (error) {
        console.error(error);
        return;
    }

    if (!data) return;

    document.getElementById("goal1").value =
        data.goal1 || "";

    document.getElementById("goal2").value =
        data.goal2 || "";

    document.getElementById("goal3").value =
        data.goal3 || "";

    document.getElementById("questions").value =
        data.questions || "";

    document.getElementById("status").value =
        data.status || "Pending";
}

async function saveEntry() {

    const goal1 =
        document.getElementById("goal1").value.trim();

    const goal2 =
        document.getElementById("goal2").value.trim();

    const goal3 =
        document.getElementById("goal3").value.trim();

    const questions =
        parseInt(
            document.getElementById("questions").value
        ) || 0;

    const status =
        document.getElementById("status").value;

    let penalty = 0;

    const hasGoals =
        goal1 !== "" ||
        goal2 !== "" ||
        goal3 !== "";

    if (hasGoals && status === "NA") {
        penalty = 5;
    }

    const { data: existing } = await db
        .from("entries")
        .select("id")
        .eq("player", player)
        .eq("date", today)
        .maybeSingle();

    let error;

    if (existing) {

        const result = await db
            .from("entries")
            .update({
                goal1,
                goal2,
                goal3,
                questions,
                status,
                penalty
            })
            .eq("id", existing.id);

        error = result.error;

    } else {

        const result = await db
            .from("entries")
            .insert({
                player,
                date: today,
                goal1,
                goal2,
                goal3,
                questions,
                status,
                penalty
            });

        error = result.error;
    }

    const message =
        document.getElementById("message");

    if (error) {

        console.error(error);

        message.textContent =
            "Error saving";

        return;
    }

    message.textContent =
        "Saved successfully";

    loadHistory();
}

async function loadHistory() {

    const { data, error } = await db
        .from("entries")
        .select("*")
        .eq("player", player)
        .order("date", {
            ascending: false
        });

    if (error) {
        console.error(error);
        return;
    }

    const history =
        document.getElementById("history");

    history.innerHTML = "";

    data.forEach(entry => {

        const div =
            document.createElement("div");

        div.style.border =
            "1px solid #444";

        div.style.padding =
            "10px";

        div.style.marginBottom =
            "10px";

        div.style.borderRadius =
            "8px";

        div.innerHTML = `
            <strong>${entry.date}</strong><br>
            Status: ${entry.status}<br>
            Questions: ${entry.questions}<br>
            Penalty: ₹${entry.penalty}
        `;

        history.appendChild(div);
    });
}