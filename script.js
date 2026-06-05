document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("predictForm");
    const page1 = document.getElementById("page-1");
    const page2 = document.getElementById("page-2");
    const backBtn = document.getElementById("backBtn");
    const submitBtn = document.getElementById("submitBtn");
    
    let comparisonChartInstance = null;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Prevent multiple simultaneous calls and show a spinner
        submitBtn.disabled = true;
        const originalBtnHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch animate-spin"></i> Running Machine Learning Model...`;

        // Collate form parameters into structural JSON object format
        const data = {
            OverallQual: parseFloat(document.getElementById("OverallQual").value),
            YearBuilt: parseFloat(document.getElementById("YearBuilt").value),
            YearRemodAdd: parseFloat(document.getElementById("YearRemodAdd").value),
            TotalBsmtSF: parseFloat(document.getElementById("TotalBsmtSF").value),
            "1stFlrSF": parseFloat(document.getElementById("1stFlrSF").value),
            GrLivArea: parseFloat(document.getElementById("GrLivArea").value),
            FullBath: parseFloat(document.getElementById("FullBath").value),
            TotRmsAbvGrd: parseFloat(document.getElementById("TotRmsAbvGrd").value),
            GarageCars: parseFloat(document.getElementById("GarageCars").value),
            GarageArea: parseFloat(document.getElementById("GarageArea").value),
            MSZoning: document.getElementById("MSZoning").value,
            BldgType: document.getElementById("BldgType").value,
            Heating: document.getElementById("Heating").value,
            KitchenQual: document.getElementById("KitchenQual").value,
            SaleCondition: document.getElementById("SaleCondition").value,
            LandSlope: document.getElementById("LandSlope").value,
            Utilities: document.getElementById("Utilities").value
        };

        try {
            const response = await fetch("/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error("API Route prediction channel unavailable.");

            const result = await response.json();
            
            // Safe extraction step to remove text like "Predicted Price: $" before parsing
            let rawPrediction = result.prediction;
            if (typeof rawPrediction === "string") {
                rawPrediction = rawPrediction.replace(/[^0-9.]/g, "");
            }
            
            const predictedValue = parseFloat(rawPrediction);

            if (isNaN(predictedValue)) {
                throw new Error("Unable to parse numerical output vector from API object.");
            }

            // Inject formatted structural layout text elements into dashboard panel
            document.getElementById("result").innerHTML = `$${predictedValue.toLocaleString(undefined, { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
            })}`;

            // Switch layout screens smoothly
            page1.classList.add("hidden");
            page2.classList.remove("hidden");

            // Chart range distributions matching housing ranges
            const baselineLowPrice = 135000;
            const baselineAvgPrice = 180000;
            const baselinePremiumPrice = 340000;

            renderComparisonChart(predictedValue, baselineLowPrice, baselineAvgPrice, baselinePremiumPrice);

        } catch (error) {
            console.error("Pipeline failure:", error);
            alert("Error processing your house valuation request. Please verify backend state.");
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;
        }
    });

    backBtn.addEventListener("click", function () {
        page2.classList.add("hidden");
        page1.classList.remove("hidden");
    });

    function renderComparisonChart(pred, low, avg, high) {
        const ctx = document.getElementById("comparisonChart").getContext("2d");

        if (comparisonChartInstance) {
            comparisonChartInstance.destroy();
        }

        // Initialize responsive glassmorphism chart layout configuration
        comparisonChartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Regional Entry-Level", "Market Average Average", "Your House Appraisal", "Luxury Tier Ceiling"],
                datasets: [{
                    label: "Valuation Scale ($)",
                    data: [low, avg, pred, high],
                    backgroundColor: [
                        "rgba(148, 163, 184, 0.2)",  // Entry Level
                        "rgba(59, 130, 246, 0.25)",  // Average 
                        "rgba(168, 85, 247, 0.85)",  // Cosmic Purple Highlight for your house
                        "rgba(99, 102, 241, 0.25)"   // Premium Luxury Ceiling
                    ],
                    borderColor: [
                        "rgba(148, 163, 184, 0.5)",
                        "#3b82f6",
                        "#a855f7",                  // Neon purple accent line
                        "#6366f1"
                    ],
                    borderWidth: 2,
                    borderRadius: 12,
                    barThickness: 36
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: "rgba(255, 255, 255, 0.05)", drawTicks: false },
                        ticks: {
                            callback: function(value) { return "$" + (value / 1000) + "k"; },
                            color: "rgba(255,255,255,0.4)",
                            font: { size: 10, weight: "500" }
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: "rgba(255,255,255,0.6)", font: { size: 11, weight: "600" } }
                    }
                }
            }
        });
    }
});